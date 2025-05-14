const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
require("dotenv").config();

const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8001;
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

// MongoDB Connection
connectToMongoDB(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected!"));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// Redirection Route
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error during redirection:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Home Route (Render Page)
app.get("/", async (req, res) => {
  const urls = await URL.find({});
  res.render("home", {
    urls: urls,
    id: req.query.id || null,
    baseURL // 💡 Pass baseURL to EJS
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on:-> ${baseURL}`);
});
