const shortid = require("shortid");
const URL = require('../models/url.js')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' });
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    // Redirect to home page with the generated ID as a query parameter
    return res.redirect(`/?id=${shortID}`);
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory,
    })
}

// Delete from Start '/delete/start'
async function deleteUrlFromStart(req, res) {
    try {
      const oldest = await URL.findOne().sort({ createdAt: 1 });
      if (oldest) await URL.findByIdAndDelete(oldest._id);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error deleting from start');
    }
};
  
  // Delete from End (latest entry) '/delete/end'
async function deleteUrlFromEnd (req, res) {
    try {
      const latest = await URL.findOne().sort({ createdAt: -1 });
      if (latest) await URL.findByIdAndDelete(latest._id);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error deleting from end');
    }
};
  
  // Delete by search (shortId or redirectURL) '/delete/search'
async function deleteUrlBySearch (req, res) {
    try {
      const query = req.body.search.trim();
      await URL.deleteMany({
        $or: [
          { shortId: query },
          { redirectURL: { $regex: query, $options: 'i' } }
        ]
      });
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error deleting by search');
    }
};
  
  // Delete all '/delete/all'
async function deleteAllUrls(req, res) { 
    try {
      await URL.deleteMany({});
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error deleting all URLs');
    }
};

async function deleteSingleUrl(req, res) {
    try {
        const { shortId } = req.params;
        await URL.findOneAndDelete({ shortId });
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
  

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    deleteUrlFromStart,
    deleteUrlFromEnd,
    deleteUrlBySearch,
    deleteAllUrls,
    deleteSingleUrl
}