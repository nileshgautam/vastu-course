const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
