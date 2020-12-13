const {Schema,model, Types} = require('mongoose')

const schema = new Schema({
    uid: {type: String,required:true,unique:true},
    name: {type: String,required:true},
    role: {type: String,required:true},
    level: {type: Number,required:true},
    online: { type:Date, default: Date.now},
    friends: [{type: Types.ObjectId, ref: 'User'}],
    group_chats: [{type: Types.ObjectId, ref: 'Chat'}],
    private_chats: [{type: Types.ObjectId, ref: 'Chat'}],
    
    // email: {type: String,required:true,unique:true},
    // password: {type: String, required: true},
    // links: [{type: Types.ObjectId, ref: 'Link'}]
})


module.exports = model('User',schema)