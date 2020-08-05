const express = require("express");

const postsRouter = require("./posts/posts-router.js");
const commentsRouter = require("./comments/comments-router.js")

const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.send(`
    <h2>server working</h>
    
  `);
});
server.use("/api/posts", postsRouter);
server.use("/api/posts", commentsRouter);
server.listen(6050, () => {
    console.log("listening to server localhost:6050");
});
