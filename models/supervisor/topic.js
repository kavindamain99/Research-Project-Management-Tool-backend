import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    topicId : {
        type : String,
        default : "1234"
    },
    groupId : {
        type : String,
        required : [true, "Group id required"]
    },
    field : {
        type : String,
        required : [true, "Field required"],
    },
    studentId : {
        type : String
    },
    topic : {
        type : String,
        required : [true, "Topic required"]
    },
    description : {
        type : String,
        required : [true, "Description required"]
    },
    supervisorId : {
        type : String,
        required : true,
        default : "Supervisor ID"
    },
    supervisorName : {
        type : String,
        required : true,
        default : "Supervisor name"
    },
    role : {
        type : String,
        default : "Supervisor",
        enum : ["Supervisor", "Co-supervisor"]
    },
    state : {
        type : String,
        default : "pending",
        enum : ["accepted", "rejected", "pending"]
    },
    panelMemberId : {
        type : String,
        required : true,
        default : "Panel member ID"
    },
    panelMemberName : {
        type : String,
        required : true,
        default : "Panel member name"
    },
    evaluated : {
        type : Boolean,
        default : false
    },
    evaluation : {
        type : String,
        default : "Evaluation pending"
    }
}, { timestamps : true });

export default mongoose.model("topic", topicSchema);