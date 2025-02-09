const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require("./connect.js");
const { restrictTo, checkForAuthentication } = require("./middleware/auth.js");
const URL = require('./models/url.js');

const staticRoute = require('./routes/staticRouter.js');
const urlRoute = require("./routes/url.js");
const userRoute = require('./routes/user.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(checkForAuthentication);


connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.get('/url/:shortId', async (req, res) => {
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
