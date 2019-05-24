const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String },
    password: { type: String },
    created: { type: Date, default: Date.now },
    isConfirmed: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
});

//Não usa-se Arrow Function por causa do this que usaremos nesta função
// UserSchema.pre('save', async function (next) {
//     let user = this;
//     if (!user.isModified('password')) return next();
//     const salt = bcrypt.genSaltSync(10);
//     user.password = await bcrypt.hashSync(user.password, salt);
//     return next;
// });

module.exports = mongoose.model('User', UserSchema);