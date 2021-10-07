const express = require("express");
const { getVideoDurationInSeconds } = require("get-video-duration");

const adminAuth = require("../middlewares/adminAuth");
const Admin = require("../models/admin");
const Course = require("../models/course");
const Module = require("../models/module");
const Lecture = require("../models/lecture");

const router = new express.Router();

// Login and signUp

router.post("/signup", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).send({ admin, msg: "Registration success!" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.send({ admin, token, msg: "Logged In", status: 200 });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Enter Valid Username/Password", status: 400 });
  }
});

router.get("/", adminAuth ,async(req, res)=> {

	res.send({status: 200, admin: req.admin})

})

router.post("/logout", adminAuth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();

    res.send({ status: 200, msg: "Logged Out!" });
  } catch (e) {
    res.send({ status: 500, msg: "Something went wrong!" });
  }
});

// Course crud

router.post("/course", adminAuth, async (req, res) => {
  try {
    if (!req.body.learnings) {
      return res.send({
      	status: 400,
        msg: "Enter Atleast one learning outcome",
      });
    }
    const course = new Course(req.body);
    course.save();
    res.send({
    status: 200,
      course,
      msg: "Course created successfully",
    });
  } catch (e) {
    console.log(e);
    res.send({
    status: 500,
      msg: "Something went wrong.",
    });
  }
});

router.patch("/course/:id", adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = [
    "title",
    "description",
    "picture",
    "author",
    "authorInfo",
    "info",
  ];
  const operation = updates.every((update) => allowedupdates.includes(update));
  if (!operation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      return res.status(404).send({
        msg: "Course not found!",
      });
    }
    updates.forEach((update) => (course[update] = req.body[update]));
    await course.save();
    res.status(200).send({
      course,
      msg: "Course updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

router.delete("/course/:id", adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      return res.status(404).send({
        msg: "Course Not Found",
      });
    }
    await course.remove();
    return res.status(200).send({
      msg: "Course deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

// Module Crud

router.post("/module/:id", adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      return res.status(404).send({
        msg: "Course Not Found",
      });
    }
    const module = new Module({
      title: req.body.title,
      courseId: course._id,
    });
    await module.save();
    res.status(201).send({
      module,
      msg: "New Module Added!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

router.patch("/module/:id", adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["title"];
  const operation = updates.every((update) => allowedupdates.includes(update));
  if (!operation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }
  try {
    const module = await Module.findOne({ _id: req.params.id });
    if (!module) {
      return res.status(404).send({
        msg: "Module not found!",
      });
    }
    updates.forEach((update) => (module[update] = req.body[update]));
    await module.save();
    res.status(200).send({
      module,
      msg: "Module updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

router.delete("/module/:id", adminAuth, async (req, res) => {
  try {
    const module = await Module.findOne({ _id: req.params.id });
    if (!module) {
      return res.status(404).send({
        msg: "Module Not Found",
      });
    }
    await module.remove();
    return res.status(200).send({
      msg: "Module deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

// Lecture Crud

router.post("/lecture/:id", adminAuth, async (req, res) => {
  try {
    const module = await Module.findOne({ _id: req.params.id });
    if (!module) {
      return res.status(404).send({
        msg: "Module Not Found",
      });
    }
    const course = await Course.findOne({ _id: module.courseId });
    if (!course) {
      return res.status(404).send({
        msg: "Course Not Found",
      });
    }
    if (!req.body.video) {
      return res.status(400).send({
        msg: "Please upload a video",
      });
    }
    const duration = await getVideoDurationInSeconds(req.body.video);
    // const duration = "00:00:00";
    const lecture = new Lecture({
      ...req.body,
      duration,
      courseId: course._id,
      moduleId: module._id,
    });
    await lecture.save();
    return res.status(200).send({
      lecture,
      msg: "Lecture Added",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

router.patch("/lecture/:id", adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["title", "video", "thumbnail"];
  const operation = updates.every((update) => allowedupdates.includes(update));
  if (!operation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }
  try {
    const lecture = await Lecture.findOne({ _id: req.params.id });
    if (!lecture) {
      return res.status(404).send({
        msg: "Lecture not found!",
      });
    }
    updates.forEach((update) => (lecture[update] = req.body[update]));
    if (updates.includes("video")) {
      const duration = await getVideoDurationInSeconds(req.body.video);
      lecture.duration = duration;
    }
    await lecture.save();
    res.status(200).send({
      lecture,
      msg: "Lecture updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

router.delete("/lecture/:id", adminAuth, async (req, res) => {
  try {
    const lecture = await Lecture.findOne({ _id: req.params.id });
    if (!lecture) {
      return res.status(404).send({
        msg: "Lecture Not Found",
      });
    }
    await lecture.remove();
    return res.status(200).send({
      msg: "Lecture deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      msg: "Something Went Wrong",
    });
  }
});

module.exports = router;
