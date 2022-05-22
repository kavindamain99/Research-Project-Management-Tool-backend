const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5000;

//routes
const authRouter = require("./routes/auth/register");
app.use("/api/auth", authRouter);
const adminRouter = require("./routes/admin/userRouter");
app.use("/api/admin", adminRouter);

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
