const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = await jwt.sign(
    { _id: admin._id.toString() },
    process.env.JWT_SECRET
  );
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

adminSchema.statics.findByCredentials = async (username, password) => {
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return admin;
};

adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
