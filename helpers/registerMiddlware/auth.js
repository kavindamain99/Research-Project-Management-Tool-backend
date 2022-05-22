const User = require("../../models/register/register");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.send("Authentication invalid");
  } else {
    console.log(authHeader);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId };
    req.userLogged = await User.findById(payload.userId).select("-password");
  } catch (error) {
    res.send("Authentication invalid user");
  }
  next();
};

module.exports = auth;
