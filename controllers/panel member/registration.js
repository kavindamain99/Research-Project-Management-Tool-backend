import PanelMember from '../../models/panel member/panelMember.js';

import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';

const saltRounds = 10;

const signUp = async (request, response) => {
    try {
        var newPanelMember = new PanelMember(request.body);
        
        const filter = { "email" : newPanelMember.email };
        const exist = await PanelMember.findOne(filter);

        if(exist) {
            response.status(422).json({ error : "This email has already been used" });
        }
        else {
            const id = uuid4();
            const hashedPassword = await bcrypt.hash(newPanelMember.password, saltRounds);

            newPanelMember.id = id;
            newPanelMember.password = hashedPassword;

            await newPanelMember.save().then((data) => {
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

        const filter = { email : email };
        const panelMember = await PanelMember.findOne(filter);
        
        if(panelMember) {
            if(await bcrypt.compare(password, panelMember.password)) {
                const token = jwt.sign(
                    { id : panelMember._id, role : "PANELMEMBER" },
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