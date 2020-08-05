const express = require("express");

const router = express.Router();

const posts = require("../data/db.js");

router.get("/", (req, res) => {
    const query = req.query;

    posts.find(query)
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." }, err)
        })
})

router.post("/", (req, res) => {
    posts.insert(req.body)
        .then(post => {
            if(post){
                res.status(201).json(post)
            }else if(!req.body.title || !req.body.contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post." 
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" }, err)
        })
})
router.put("/:id", (req, res) => {
    const newUpdate = req.body;
    posts.update(req.params.id, newUpdate)
        .then(post => {
            if(post){
                res.status(200).json(post)
            }
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }else if(!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." }, err)
        })
})
router.delete("/:id", (req, res) => {
    posts.remove(req.params.id)
        .then(move => {
            if(move) {
                res.status(200).json(req.params.id)
            }else if(!req.params.id){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})
module.exports = router;