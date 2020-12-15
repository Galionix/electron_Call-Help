const {Schema,model, Types} = require('mongoose')

const schema = new Schema({

    sender:     { type: Types.ObjectId,ref:'User',required:true},
    receiver:   { type: Types.ObjectId,ref:'User',required:true},
    chatId:     { type: Types.ObjectId,ref:'Chat',required:true},
    text:       { type: String},
    sent:       { type: Date, default: Date.now},
    imgs:       [{type: String}]
})


module.exports = model('Message',schema)