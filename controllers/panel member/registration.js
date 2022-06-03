const PanelMember = require("../../models/panel member/panelMember.js");

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
    var newPanelMember = new PanelMember(request.body);

    const exist = await PanelMember.findOne({ email: newPanelMember.email });

    if (exist) {
      return response
        .status(422)
        .json({ error: "This email has already been used" });
    } else {
      const lastPanelMember = await PanelMember.findOne().sort({ _id: -1 });
      var id;
      if (lastPanelMember == null) {
        id = "PMR0001";
      } else {
        /**
         * Get the string without the SVR prefix
         * Get the numeric value of the id and add 1
         * Convert back to String
         */
        id = String(parseInt(lastPanelMember.id.substring(3)) + 1);
        /**
         * Add leading zeroes if necessary
         * Add SVR prefix
         */
        id = "PMR" + id.padStart(4, "0");
      }

      const hashedPassword = await bcrypt.hash(
        newPanelMember.password,
        saltRounds
      );

      newPanelMember.id = id;
      newPanelMember.password = hashedPassword;

      try {
        await newPanelMember.save();
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

    const panelMember = await PanelMember.findOne({ email: email });

    if (panelMember) {
      if (await bcrypt.compare(password, panelMember.password)) {
        const token = jwt.sign(
          { id: panelMember.id, role: "PANELMEMBER" },
          process.env.JWT_PMS,
          {
            expiresIn: process.env.JWT_PMS_LIFETIME,
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
    return response
      .status(500)
      .json({ error: error.message, message: "Internal erver error" });
  }
};

module.exports = { signUp, signIn };
