const express = require("express");
const { connectMongodb } = require("../connections");
const Url = require("../models/urls")
const UrlRouter = require("../routes/url");

const PORT = 8000;
const app = express();

// ----------Connect Mongodb----
connectMongodb("mongodb://127.0.0.1:27017/short-url-db").then(() => console.log("DB connected!")).catch((err) => console.log("Faild to connect error: ", err));

// -------Middleware------
app.use(express.urlencoded({ extended: false }));

app.use("/", UrlRouter);
// redirect to the url
app.get("/:shortUrl", async(req, res) =>{
    const short_url  = req.params.shortUrl;

    try {
        const url = await Url.findOne({ short_url });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        const visitData = {
            visiting_time: new Date().toISOString(),
            visiting_ip: req.ip,
        };

        url.visitedHistory.push(visitData);
        await url.save();
        return res.redirect(url.main_url);
    } catch (err) {
        console.error('Error during redirection:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(PORT, () => console.log("Server is running!: "));