const Supervisor = require("../../models/supervisor/supervisor.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const signUp = async (request, response) => {
  if (request.body.password.length < 8) {
    return response
      .status(400)
      .json({ error: "Password must have atleast 8 characters" });
  }
  if (request.body.password !== request.body.confirmPassword) {
    return response
      .status(400)
      .json({ error: "Password and confirm password doesn't match" });
  }
  delete request.body.confirmPassword;
  try {
    var newSupervisor = new Supervisor(request.body);

    const exist = await Supervisor.findOne({ email: newSupervisor.email });

    if (exist) {
      return response
        .status(422)
        .json({ error: "This email has already been used" });
    } else {
      const lastSupervisor = await Supervisor.findOne().sort({ _id: -1 });
      var id;
      if (lastSupervisor == null) {
        id = "SVR0001";
      } else {
        /**
         * Get the string without the SVR prefix
         * Get the numeric value of the id and add 1
         * Convert back to String
         */
        id = String(parseInt(lastSupervisor.id.substring(3)) + 1);
        /**
         * Add leading zeroes if necessary
         * Add SVR prefix
         */
        id = "SVR" + id.padStart(4, "0");
      }

      const hashedPassword = await bcrypt.hash(
        newSupervisor.password,
        saltRounds
      );

      newSupervisor.id = id;
      newSupervisor.password = hashedPassword;

      try {
        await newSupervisor.save();
        return response.status(200).json({ message: "Signup succesfull" });
      } catch (error) {
        const errorMessage = error.message.split(": ");
        return response.status(400).json({ error: errorMessage[2] });
      }
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: error.message, message: "Internal erver error" });
  }
};

const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    /**
     * Check if this validation necessary
     */
    if (!email || !password) {
      return response.send("Email and password necessary");
    }

    const supervisor = await Supervisor.findOne({ email: email });

    if (supervisor) {
      if (await bcrypt.compare(password, supervisor.password)) {
        const token = jwt.sign(
          { id: supervisor.id, role: "SUPERVISOR" },
          process.env.JWT_SS,
          {
            expiresIn: process.env.JWT_SS_LIFETIME,
          }
        );
        return response.status(200).json({ token: "Bearer " + token });
      } else {
        return response
          .status(401)
          .json({ error: "Invalid email or password" });
      }
    } else {
      return response.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: error.message, message: "Internal erver error" });
  }
};

module.exports = { signUp, signIn };
