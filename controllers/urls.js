const Url = require("../models/urls");
const ShortUniqueId = require("short-unique-id");

const createShortUrl = async (req, res) => {
    const body = req.body;
    const { randomUUID } = new ShortUniqueId(8);
    const shortUrl = randomUUID();
    const result = await Url.create({
        main_url: body.main_url,
        short_url: shortUrl,
        visitedHistory: []
    });
    return res.status(201).json({ status: "success", shortUrl: shortUrl });
}



module.exports = {
    createShortUrl,
}