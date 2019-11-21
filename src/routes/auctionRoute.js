const express = require('express');
const router = express.Router();
const Auctions = require('../models/auction')

router.get('/', async (req,res) => {
    try{
        const auctions = await auctions.find({});
        return res.send(auctions);
    } catch (err) {
        return res.status(500).send({err: 'Erro na consulta de Leilões! '})
    }
})

//GetById
//Post
//Lance -- É uma ação dentro das rotas que serve para atualizar (PUT) o valor atual dos leilões.