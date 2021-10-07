require("dotenv").config();
const express = require("express");
const connectDB = require("./db/mongoose");
const coursesRouter = require("./routes/courses");
const adminRouter = require("./routes/admin");
const modulesRouter = require("./routes/module");
const lecturesRouter = require("./routes/lecture");

const app = express();
connectDB();
// const port = process.env.PORT;
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS, PATCH"
  );
  next();
});
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/admin", adminRouter);
app.use("/modules", modulesRouter);
app.use("/lectures", lecturesRouter);

if ( process.env.NODE_ENV == "production"){

  app.use(express.static("coursify-ui/build"));

  const path = require("path");

  app.get("*", (req, res) => {

      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

  })


}

app.listen(PORT, () => {
  console.log(`App is on port ${PORT}`);
});
