const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    name: {type: String, required:true},
    initialValue: {type: Number, required:true},
    initialDate: {type: Date, default:Date.now},
    finalDate: {type: Date, default:() => new Date(+new Date() + 3*24*60*60*1000)},
    currentValue: {type: Number, default: this.initialValue},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', /*required: true*/},
    userBidId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    images: [{
            imageUrl: {type: String}
    }]
});

module.exports = mongoose.model('Auction', AuctionSchema);