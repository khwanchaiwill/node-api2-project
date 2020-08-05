const express = require("express");

const router = express.Router();

const comments = require("../data/db.js");

router.get("/", (req, res) => {
    const query = req.query;

    comments.find(query)
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})


router.get("/:id/comments", (req, res) => {
      comments.findPostComments(req.params.id)
      .then((ment) => {
        if (ment) {
            console.log(ment)
          res.status(200).json(ment);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      });
  });
  router.post("/:id/comments", (req, res) => {
    const id = req.params.id; 
    console.log(req.params.id)
    const comment = req.body;
    comment.post_id = Number(id);
    if (!comment.text) {
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    } else {
      comments.findPostComments(req.params.id)
        .then((ment) => {
          if (ment) {
            comments.insertComment(comment);
            res.status(201).json(comment);
          } else {
            res
              .status(404)
              .json({
                message: "The post with the specified ID does not exist.",
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({
              error:
                "There was an error while saving the comment to the database",
            });
        });
    }
  });
  module.exports = router;