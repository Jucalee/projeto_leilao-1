const bcrypt = require('bcryptjs');

const hashSenha = (password) => {
   return bcrypt.hashSync(password, 10);
}

const checkSenha = (password, userPassword) => {
    const senhaCriptografada = bcrypt.hashSync(password, 10);
    // console.log(password);
    // console.log(senhaCriptografada);
    // console.log(userPassword);
    return bcrypt.compare(password, userPassword).then((res)=> {
        // console.log(res);
        return res;
    })
}


module.exports = {
    hashSenha,
    checkSenha
}