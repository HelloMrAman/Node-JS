const express = require('express');
const {connectMongoDb} = require('./connection')

const {logReqRes} = require("./middlewares")
const userRouter = require('./routes/user')

const app = express();
const PORT = 3000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/mong-node-tut').then(() => {
  console.log("MongoDB Connected!")
})

// Middleware
app.use(express.urlencoded({ extended: true })); // Handle x-www-form-urlencoded data
app.use(logReqRes("log.txt"));


app.use("/api/users", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
