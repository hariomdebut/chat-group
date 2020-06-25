'use strict';
const mongoose = require('mongoose');
const messageModel = require('./message.model');
const chatGroupModel = require('../chat-group/chat-group.model');
class MessageController {

	/** 
	 * @description Fetch the users message with unread count. This list will contain only last message from every chat
	 * @param userID string
	 * @returns {object} {status, data}
	 * @author Hari Om
	 */
	static async listUsers(data) {
		try {
			const userID = mongoose.Types.ObjectId(data.id);
			const FIELDS = [];
			const response = await chatGroupModel.aggregate([
				{
					$match: { members: { $elemMatch: { user_id: userID } } }
				},
				{
					"$lookup": {
						"from": "messages",
						"let": { "room": "$_id" },
						"pipeline": [
							{
								"$match": {
									"$expr": {
										$eq: ["$chat_room_id", "$$room"]
									}
								}
							},
							{ "$project": { "created_at": 1, "message": 1, "sender": 1, "_id": 0 } },
							{ $sort: { created_at: -1 } },
							{ $limit: 1 }
						],
						"as": "chat"
					}
				},
				{ $unwind: "$chat" },
				{ $sort: { "chat.created_at": -1 } },
				{
					"$lookup": {
						"from": "users",
						"let": { "userID": "$chat.sender" },
						"pipeline": [
							{
								"$match": {
									"$expr": {
										$eq: ["$_id", "$$userID"]
									}
								}
							},
							{ "$project": { "full_name": 1, "profile_pic": 1 } }
						],
						"as": "sender"
					}
				},
				{ $unwind: "$sender" },
				{
					"$project":
					{
						"name": 1, "description": 1, "chat": 1, "sender": 1, "type": 1, "members": {
							$filter: {
								"input": "$members",
								"as": "members",
								"cond": {
									"$eq": ["$$members.user_id", userID]
								}
							}
						}
					}
				},
				{ $unwind: "$members" },
				{ $project:
					{
						"name": 1, "description": 1, "chat": 1, "sender": 1, "unread_count": "$members.unread", "type": 1
					}
				}
			]);
			return {
				status: constants.REQUEST_SUCCESS,
				data: {
					message: "some message",
					data: response
				}
			};
		} catch (error) {
			// handling internal server errors
			return {
				status: constants.INTERNAL_SERVER_ERROR,
				data: {
					message: error.message ? error.message : 'Something went wrong'
				}
			};
		}
	}
}

module.exports = MessageController;