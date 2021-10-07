const express = require("express");

const Module = require("../models/module");

const router = new express.Router();

router.get("/:id", async (req, res) => {
  try {
    const modules = await Module.find({ courseId: req.params.id });
    res.status(200).send({
      modules,
      msg: "All Modules",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

module.exports = router;
