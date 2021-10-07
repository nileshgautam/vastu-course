const express = require("express");
const Course = require("../models/course");

const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({
      courses,
      msg: "All courses sent!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

module.exports = router;
