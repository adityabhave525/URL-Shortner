const express = require("express");
const { connectToMongoDB } = require("./connect.js");

const urlRoute = require("./routes/url");

const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
