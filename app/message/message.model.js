'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//message model storing all type of one to one or group related messages
const chatSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    message: { type: String, default: '' },
    chat_room_id : { type : Schema.Types.ObjectId, ref : 'users', default : null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

//export the model
module.exports = mongoose.model('message', chatSchema);