const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('start');
})

app.listen(3000, () => {
})