const express = require("express");
const expressValidator = require("express-validator");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const path = require("path");
app.use(cors());
const helmet = require("helmet");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    // ...
  })
);
const port = process.env.PORT || 5000;

app.use(expressValidator());

//const directory = path.join(__dirname, "/uploads/document");
app.use("/uploads", express.static(path.join(__dirname, "/uploads/document")));
//routes
const authRouter = require("./routes/auth/register");
app.use("/api/auth", authRouter);
const adminRouter = require("./routes/admin/userRouter");
app.use("/api/admin", adminRouter);
const documentRouter = require("./routes/admin/document");
app.use("/api/admin/document", documentRouter);

const staffRouter = require("./routes/admin/staff");
app.use("/api/staff", staffRouter);

const submissionRouter = require("./routes/admin/submission");
app.use("/api", submissionRouter);
const groupRouter = require("./routes/student/group");
app.use("/api/student", groupRouter);

const researchRouter = require("./routes/student/research");
app.use("/api/research", researchRouter);

const graphRouter = require("./routes/admin/graph");
app.use("/api/admin", graphRouter);

// Supervisor routes
const supervisorRoutes = require("./routes/supervisor/supervisor.js");
app.use("/api", supervisorRoutes);

// Panel member routes
const panelMemberRoutes = require("./routes/panel member/panelMember.js");
app.use("/api", panelMemberRoutes);

app.use("/", (req, res) => {
  res.json("Hello from Online research Tool");
});

// Database connection
// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("database connection established");
// });

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
