const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected!"));



app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); //for url parsing
app.use(express.urlencoded({ extended: false })); //for parsing form data
app.use(cookieParser());

// Mount the routers
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
      const entry = await URL.findOneAndUpdate(
        { shortId }, // Find the document using shortId
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        },
        { new: true } // Return the updated document
      );
  
      // If entry doesn't exist, return a 404
      if (!entry) {
        return res.status(404).json({ message: "Short URL not found" });
      }
  
      // Redirect to the original URL
      res.redirect(entry.redirectURL);
  
    } catch (error) {
      console.error("Error during redirection:", error);
      res.status(500).json({ message: "Server error, please try again later." });
    }
});

app.get('/', async (req, res) => {
  const urls = await URL.find({}); 
    res.render('home', { 
        urls: urls,
        id: req.query.id // Pass the ID from query parameters to template
    });
});
  
app.listen(PORT, () => {
  console.log(
      `Server is running on:-> http://localhost:${PORT}`
  );
});