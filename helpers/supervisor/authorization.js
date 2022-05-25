import Supervisor from '../../models/supervisor/supervisor.js';

import jwt from 'jsonwebtoken';

const authorization = async (request, response, next) => {
    const authorizationHeader = request.headers.authorization;

    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        response.send("Authorization failed");
    }
    else {
        console.log(authorizationHeader);
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SS);
        request.supervisor = { id : payload.id };
        request.supervisorLogged = await Supervisor.find({ id : payload.id }, 'id -_id');
    }
    catch {
        response.send("Unauthorized user");
    }
    next();
};

export default authorization;