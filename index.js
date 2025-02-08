const express = require("express");
const { connectToMongoDB } = require("./connect.js");

const urlRoute = require("./routes/url.js");
const URL = require('./models/url.js');

const app = express();
const PORT = 3000;

app.use(express.json());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    });
    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
