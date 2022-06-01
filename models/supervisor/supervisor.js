import mongoose from 'mongoose';

const supervisorSchema = new mongoose.Schema({
    id : {
        type : String,
        required : [true, "Id required"]
    },
    firstName : {
        type : String,
        required : [true, "Please provide a first name"]
    },
    lastName : {
        type : String,
        required : [true, "Please provide a last name"]
    },
    role : {
        type : String,
        default : "supervisor",
        enum : ["supervisor", "co-supervisor"],
        required : [true, "Please select a role" ]
    },
    email : {
        type : String,
        required : [true, "Please provide an email"],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide an valid email"]
    },
    password : {
        type : String,
        required : [true, "Please provide a password"],
        minlength : [8, "Password must have atleast 8 characters"]
    },
    field : {
        type : String,
        enum : ["Artificial Intelligence", "Blockchain", "IoT"],
        required : [true, "Please select a field"]
    },
    faculty : {
        type : String,
        enum : ["Faculty of Information Technology", "Faculty of Engineering", "Faculty of Business"],
        required : [true, "Please select a faculty"]
    },
    contactNumber : {
        type : String,
        required : [true, "Contact number required"],
        minlength : [10, "Contact number must have 10 digits"],
        minlength : [10, "Contact number must have 10 digits"]
    }
}, { timestamps : true });

export default mongoose.model("supervisor", supervisorSchema);