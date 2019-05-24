const express = require('express')
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')();
const { sendEmail, sendEmailForgot } = require('../sendMail/sendMail');
let randomstring = require('randomstring')
const auth = require('../middlewares/auth')
const {hashSenha, checkSenha} = require('../config/crypt')

//Funções Auxiliares

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires });
}


router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ err: 'Erro na consulta de usuários!' })
    }
});

router.post('/create', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).send({ error: 'Dados Insuficientes!' })

    try {
        if (await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!' })

        const password = randomstring.generate(8);

        const senhaCriptografada = await hashSenha(password)

        const user = await Users.create({ ...req.body, password: senhaCriptografada });
        sendEmail(req.body.email, password);

        return res.status(201).send({ user, token: createUserToken(user.id) });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao Buscar o Usuário!' })
    }
});


router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' })

        if (!(await checkSenha(password, user.password))) return res.status(401).send({ error: 'Senha inválida!' })

        return res.send({ user, token: createUserToken(user.id), message: "Usuário autenticado com sucesso!" });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
});

router.post('/confirm', auth, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ erro: "Dados insuficientes" })
    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' })

        const pass_ok = await bcrypt.compareSync(password, user.password);
        if (!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!' })

        const confirmed = user.isConfirmed;
        if (confirmed) return res.status(401).send({ error: 'Usuário já confirmado!' })

        await Users.updateOne({
            email
        }, {
                isConfirmed: true
            })

        const user2 = await Users.findOne({ email });
        user2.password = undefined;

        return res.send({ user2, message: 'Usuário Ativado com Sucesso!' });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
});

router.put('/updatepassword', auth, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: "Dados insuficientes" })

    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' })

        const confirmed = user.isConfirmed;
        if (!confirmed) return res.status(401).send({ error: 'Usuário não confirmado!' })

        const senhaCriptografada = await hashSenha(password);
        await Users.updateOne({
            email
        }, {
                password: senhaCriptografada
            })

        const user2 = await Users.findOne({ email });
        // user2.password = undefined;

        return res.send({ user2, message: 'Senha alterada com sucesso!' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Erro ao buscar usuário!' })
    }
})

router.put('/forgot', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.send({ error: "Dados insuficientes!" })
    try {
        const user = await Users.findOne({ email });
        if(!user) return res.status(400).send({error: "Usuário não encontrado!"})
        
        const password = randomstring.generate(8);

        const senhaCriptografada = await hashSenha(password);
        await Users.updateOne({
            email
        }, {
                password: senhaCriptografada,
                isConfirmed: false
            })
        sendEmailForgot(email, password);
        return res.send("Email enviado com sucesso!")
    } catch (err) {
        return res.status(500).send({ error: "Erro ao buscar usuário!" })
    }
})

module.exports = router;