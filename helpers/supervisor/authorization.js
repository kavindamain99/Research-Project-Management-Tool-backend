const Supervisor = require("../../models/supervisor/supervisor.js");
const panelMember = require("../../models/panel member/panelMember.js");

const jwt = require("jsonwebtoken");

const supervisorAuthorization = async (request, response, next) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return response.status(400).json({ error: "Authorization failed" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SS);
    request.supervisor = await Supervisor.findOne({ id: payload.id });
  } catch {
    return response.status(400).json({ error: "Unauthorized user" });
  }
  next();
};

const panelMemberAuthorization = async (request, response, next) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return response.status(400).json({ error: "Authorization failed" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_PMS);
    request.panelMember = await panelMember.findOne({ id: payload.id });
  } catch {
    return response.status(400).json({ error: "Unauthorized user" });
  }
  next();
};

module.exports = {
  supervisorAuthorization,
  panelMemberAuthorization,
};
