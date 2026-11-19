const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/lab6.html"); 
});

app.get("/about", (req, res) => {
    res.send("<h1>Страница о себе</h1><p>Эхо-сервис</p>");
});

app.get("/api/status", (req, res) => {
    res.json({ status: "ok", message: "Сервер запущен" });
});

app.get("/api/echo", (req, res) => {
    const params = req.query;
    
    console.log(`Received GET /api/echo with params:`, params);

    if (Object.keys(params).length === 0) {
        return res.json({ status: "no_params", received: {} });
    }

    res.json({ ...params, status: "ok" });
});

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});