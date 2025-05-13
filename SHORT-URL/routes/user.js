const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();


// Handle GET request to display the signup form
router.get("/", (req, res) => {
    res.render("/signup");
});

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin)

module.exports = router;