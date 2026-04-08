const express = require("express");
const axios   = require("axios");
const app     = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("*", async (req, res) => {
    try {
        const url = "https://games.roblox.com" + req.originalUrl;
        console.log("Fetching:", url);
        const response = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000
        });
        res.json(response.data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Proxy running");
});
