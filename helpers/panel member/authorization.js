const PanelMember = require("../../models/panel member/panelMember.js");

const jwt = require("jsonwebtoken");

const authorization = async (request, response, next) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    response.send("Authorization failed");
  } else {
    console.log(authorizationHeader);
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_PMS);

    request.panelMember = { id: payload.id };
    request.panelMemberLogged = await PanelMember.findById(payload.id);
  } catch {
    response.send("Unauthorized user");
  }
  next();
};

module.exports = authorization;
