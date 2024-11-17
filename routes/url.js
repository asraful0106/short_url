const express = require("express");
const { createShortUrl, redirectToTheMainUrl } = require("../controllers/urls");

const router = express.Router();

router.route("/create")
.post(createShortUrl)


module.exports = router;