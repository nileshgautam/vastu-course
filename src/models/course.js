const mongoose = require("mongoose");
const Lecture = require("./lecture");
const Module = require("./module");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    authorInfo: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    ratingCount: {
      type: Number,
      required: true,
      default: 0,
    },
    studentCount: {
      type: Number,
      required: true,
      default: 0,
    },
    learnings: [String],
    best: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("remove", async function (next) {
  const course = this;
  await Module.deleteMany({ courseId: course._id });
  await Lecture.deleteMany({ courseId: course._id });
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
