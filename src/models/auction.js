const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    name: {type: String, required:true},
    initialDate: {type: Date, default:Date.now},
    finalDate: {type: Date, default:Date.now + 3},
    initialValue: {type: Number, required:true},
    currentValue: {type: Number, default: initialValue, required: true},
    bidId: {type: Number},
    userId: {type: Number},
    images: [{
            imageUrl: {type: String}
    }]
});

module.exports = mongoose.model('Auction', AuctionSchema);