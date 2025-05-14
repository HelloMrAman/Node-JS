const express = require("express");
const URL = require("../models/url");
const router = express.Router();

const baseURL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8001}`;

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
    id: req.query.id, // pass query parameter to template
    baseURL // ✅ pass baseURL to EJS
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup"); 
});

router.get("/login", (req, res) => {
  return res.render("login"); 
});

module.exports = router;