import mongoose from 'mongoose';

const panelMemberSchema = new mongoose.Schema({
    id : {
        type : String,
        required : [true, "Id required"]
    },
    firstName : {
        type : String,
        required : [true, "First name required"]
    },
    lastName : {
        type : String,
        required : [true, "Last name required"]
    },
    email : {
        type : String,
        required : [true, "Email required"]
    },
    password : {
        type : String,
        required : [true, "Password required"]
    },
    contactNumber : {
        type : String,
        required : [true, "Contact number required"]
    }
}, { timestamps : true });

export default mongoose.model("panelmember", panelMemberSchema);