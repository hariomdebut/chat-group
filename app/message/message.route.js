'use strict';

const express = require('express');
const router = express.Router();
var messageObj = require('./message.controller');

/**
 * @description Get User Messages List
 * @param {callbcak} function(req,res)
 * @returns {object} {status, data}
 * @author Hari Om
 */
router.get('/list/:id', async (req, res) => {
	try {
		console.log('req.params', req.params);
		const result = await messageObj.listUsers(req.params);
		res.status(result.status).json(result.data);
	} catch (excep) {
		res.status(constants.INTERNAL_SERVER_ERROR).json(error);
	}
});
module.exports = router;
