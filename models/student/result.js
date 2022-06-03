import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    /* groupName: {
        type: "string",
        required: [true, "group name must be provided"],
    }, */
    groupId: {
        type: "string",
        unique: true,
    },
    student1: {
        studentId : {
            type : String,
            default : "No ID"
        },
        documentMarks : {
            type : Number,
            default : 0
        },
        presentationMarks : {
            type : Number,
            default : 0
        },
        finalThesisMarks : {
            type : Number,
            default : 0
        }
    },
    student2: {
        studentId : {
            type : String,
            default : "No ID"
        },
        documentMarks : {
            type : Number,
            default : 0
        },
        presentationMarks : {
            type : Number,
            default : 0
        },
        finalThesisMarks : {
            type : Number,
            default : 0
        }
    },
    student3: {
        studentId : {
            type : String,
            default : "No ID"
        },
        documentMarks : {
            type : Number,
            default : 0
        },
        presentationMarks : {
            type : Number,
            default : 0
        },
        finalThesisMarks : {
            type : Number,
            default : 0
        }
    },
    student4: {
        studentId : {
            type : String,
            default : "No ID"
        },
        documentMarks : {
            type : Number,
            default : 0
        },
        presentationMarks : {
            type : Number,
            default : 0
        },
        finalThesisMarks : {
            type : Number,
            default : 0
        }
    }
}, { timestamps : true });

export default mongoose.model("result", resultSchema);