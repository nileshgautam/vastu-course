const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!admin) {
      throw new Error();
    }
    req.admin = admin;
    req.token = token;
    next();
  } catch (e) {
    res.send({
    status: 401,
      error: "Not authenticated",
    });
  }
};

module.exports = adminAuth;
