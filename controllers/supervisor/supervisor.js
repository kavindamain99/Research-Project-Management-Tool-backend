import Supervisor from '../../models/supervisor/supervisor.js';

import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';

const saltRounds = 10;

const signUp = async (request, response) => {
    try {
        var newSupervisor = new Supervisor(request.body);
        
        const filter = { "email" : newSupervisor.email }
        const exist = await Supervisor.findOne(filter);

        if(exist) {
            response.status(422).json({ error : "This email has already been used" });
        }
        else {
            const id = uuid4();
            const hashedPassword = await bcrypt.hash(newSupervisor.password, saltRounds);

            newSupervisor.id = id;
            newSupervisor.password = hashedPassword;

            await newSupervisor.save().then((data) => {
                response.status(200).json({ message : "Signup succesfull" })
            }).catch((error) => {
                console.log(error);
                response.status(400).json({ error : error.message, message : "Signup failed" });
            });
        }
    }
    catch(error) {
        response.status(500).json({ error : error.message, message : "Internal erver error" });
    }
};

const signIn = async (request, response) => {
    try {
        const { email, password } = request.body;

        /**
         * Check if this validation necessary
         */
        if(!email || !password) {
            response.send("Email and password necessary");
        }

        const filter = { email : email }
        const supervisor = await Supervisor.findOne(filter);
        
        if(supervisor) {
            if(await bcrypt.compare(password, supervisor.password)) {
                const token = jwt.sign(
                    { id : supervisor._id, role : "SUPERVISOR" },
                    process.env.JWT_SS,
                    {
                        expiresIn : process.env.JWT_SS_LIFETIME
                    }
                );
                response.status(200).json({ token : token });
            }
            else {
                response.status(401).error({ message : "Invalid email or password" });
            }
        }
        else {
            response.status(401).error({ message : "Invalid email or password" });
        }
    }
    catch(error) {
        response.status(500).json({ error : error.message, message : "Internal erver error" });
    }
};

export {
    signUp,
    signIn
};