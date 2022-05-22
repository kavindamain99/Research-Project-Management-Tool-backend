const User = require("../../models/register/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//admin registration
const Register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save({ ...req.body });
    const token = jwt.sign(
      { userId: user._id, name: user.lastName },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.status(200).json({ user: { name: user.getId() }, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const Login = async (req, res) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    res.send("please provide a Student ID and password");
  }
  const user = await User.findOne({ studentId: studentId });
  if (!user) {
    res.send("invalid Studen ID");
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );

      res.status(200).json({
        user: { name: user.getId() },
        password: { password: user.password },
        token,
      });
    } else {
      res.send("Invalid Password");
    }
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("please provide a email and password");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res.send("invalid Email");
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );

      res.status(200).json({
        token,
      });
    } else {
      res.send("Invalid Password");
    }
  }
};

module.exports = {
  Register,
  Login,
  adminLogin,
};
