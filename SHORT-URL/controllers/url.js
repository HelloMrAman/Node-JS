const shortid = require("shortid");
const URL = require('../models/url.js');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    // Render the index.ejs with new shortId
    return res.render("home", {
        id: shortID,
        baseURL: req.protocol + "://" + req.get("host"),
    });
}