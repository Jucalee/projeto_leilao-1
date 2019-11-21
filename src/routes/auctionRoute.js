const express = require('express');
const router = express.Router();
const Auctions = require('../models/auction')
const AuctionController = require('../controllers/auctionController')

router.get('/', AuctionController.showAuctions)
router.post('/', AuctionController.create)

module.exports = router

//GetById
//Post
//Lance -- É uma ação dentro das rotas que serve para atualizar (PUT) o valor atual dos leilões.