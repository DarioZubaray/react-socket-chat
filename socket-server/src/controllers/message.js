const { response } = require('express');
const MessageSchema = require('../models/messageSchema');

const historyChat = async (req, res = response) => {

    const sourceId = req.uid;
    const destinationId = req.params.destinationId;

    const history = await MessageSchema.find({
        $or: [
            { from: sourceId, to: destinationId },
            { from: destinationId, to: sourceId },
        ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        messages: history
    })

}

module.exports = {
    historyChat
}