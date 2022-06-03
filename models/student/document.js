import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    studentId: {
        type: "string",
        required: [true, "Student ID must be provided"],
    },
    groupId: {
        type: "string",
        required: [true, "Group ID must be provided"],
    },
    topicId: {
        type: "string",
        required: [true, "Topic ID must be provided"],
    },
    submitTime: {
        type: "string",
        required: [true, "Submit ID must be provided"],
    },
    type : {
        type : String,
        required : true
    },
    document: {
        type: "string",
        required: [true, "student must be provided"],
    },
    cloudinary_id: {
        type: "string",
        required: [true],
    },
    marked : {
        type : Boolean,
        default : false
    },
    markedBy : {
        type : String,
        default : "pending"
    }
}, { timestamps : true });

export default mongoose.model("studentsubmissions", documentSchema);