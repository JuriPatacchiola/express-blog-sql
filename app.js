const express = require("express");
const app = express();

app.use(express.json());

const postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);

app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint non trovato"
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        error: "Errore interno del server",
        message: err.message
    });
});

app.listen(3000, () => {
    console.log("Server avviato su http://localhost:3000");
});
