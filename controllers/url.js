const { nanoid } = require('nanoid');
const URL = require('../models/url.js');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            err: 'Url is required'
        });
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({
        id: shortId
    });
}

module.exports = {
    handleGenerateNewShortURL,
};