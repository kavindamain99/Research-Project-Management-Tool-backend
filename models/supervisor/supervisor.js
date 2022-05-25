import mongoose from 'mongoose';

const supervisorSchema = new mongoose.Schema({
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
    role : {
        type : String,
        default : "supervisor",
        enum : ["supervisor", "co-supervisor"],
        required : true
    },
    email : {
        type : String,
        required : [true, "Email required"]
    },
    password : {
        type : String,
        required : [true, "Password required"]
    },
    field : {
        type : String,
        enum : ["Artificial Intelligence", "Blockchain", "IoT"]
    },
    contactNumber : {
        type : String,
        required : [true, "Contact number required"]
    }
}, { timestamps : true });

export default mongoose.model("supervisor", supervisorSchema);