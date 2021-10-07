const mongoose = require("mongoose");
const Lecture = require("./lecture");

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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

moduleSchema.pre("remove", async function (next) {
  const module = this;
  await Lecture.deleteMany({ moduleId: module._id });
  next();
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
