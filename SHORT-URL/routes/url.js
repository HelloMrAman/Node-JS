const express = require("express");
const { handleGenerateNewShortUrl, handleGetAnalytics, deleteUrlFromStart, deleteUrlFromEnd, deleteUrlBySearch, deleteAllUrls, deleteSingleUrl } = require("../controllers/url.js");

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

router.post('/delete/start', deleteUrlFromStart);
router.post('/delete/end', deleteUrlFromEnd);
router.post('/delete/search', deleteUrlBySearch);
router.post('/delete/all', deleteAllUrls);
router.delete('/delete/:shortId', deleteSingleUrl)
module.exports = router;