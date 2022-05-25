import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    topicId : {
        type : String,
        required : true
    },
    groupId : {
        type : String,
        required : [true, "Group id required"]
    },
    field : {
        type : String,
        required : [true, "Field required"],
        enum : ["Artificial Intelligence", "Blockchain", "IoT"]
    },
    topic : {
        type : String,
        required : [true, "Topic required"]
    },
    description : {
        type : String,
        required : [true, "Description required"]
    },
    state : {
        type : String,
        default : "pending",
        enum : ["accepted", "rejected", "pending"]
    }
}, { timestamps : true });

export default mongoose.model("topic", topicSchema);