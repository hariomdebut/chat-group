'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//users model storing all type of users -> compund indexes used
const usersSchema = new Schema({
    full_name: { type: String, trim: true, required: [true, "Full Name is required"] },
    username: { type: String, index: true, required: true },
    email: { type: String, trim: true, index: true, match: /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i, required: true },
    phone: { type: String, trim: true, required: true, index: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: "" },
    language: { type: String, default: "en" },
    last_login: { type: Date }, //time when user active
    is_deleted: { type: Number, default: 0 }, //1-deleted by admin
    verified_status: { type: Number, default: 0 }, // 0 for not verified, 1 for phone, 2 for email, 3 for both
    status: { type: Number, default: 1 }, // 0-inactive, 1-active,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

//export the model
module.exports = mongoose.model('users', usersSchema);