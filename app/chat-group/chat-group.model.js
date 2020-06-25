'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//chat model storing all type of group and related activity 
const chatSchema = new Schema({
	name: { type: String, default: "" },
	description: { type: String, default: "" },
	image: { type: String, default: "" },
	admin: { type: Schema.Types.ObjectId, ref: "users" },
	type: { type: Number, default: 1 },
	members: [{
		user_id: { type: Schema.Types.ObjectId, ref: "users" },
		added_by: { type: Schema.Types.ObjectId, ref: "users" },
		date: { type: Date },
		status: { type: Number, default: 1 },
		unread: { type: Number, default: 0 },
		last_seen: { type: Date }
	}],

	number_of_members: { type: Number, default: 0 },
	is_deleted: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

//export the model
module.exports = mongoose.model('chatgroup', chatSchema);