const express = require("express");

const Lecture = require("../models/lecture");

const router = new express.Router();

router.get("/:id", async (req, res) => {
  try {
    const lectures = await Lecture.find({ courseId: req.params.id });
    res.status(200).send({
      lectures,
      msg: "All Lectures",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

router.get("/lecturem/:id", async (req, res) => {
  try {
    const lectures = await Lecture.find({ moduleId: req.params.id });
    res.status(200).send({
      lectures,
      msg: "All Lectures",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

module.exports = router;
