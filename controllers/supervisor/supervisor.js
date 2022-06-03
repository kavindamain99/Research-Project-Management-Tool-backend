import Topic from '../../models/supervisor/topic.js';
import Document from '../../models/supervisor/document.js';
import Group from '../../models/student/group.js';
import StudentDocument from '../../models/student/document.js';
import Result from '../../models/student/result.js';

/**
 * middleware
 * get the topic from the redeived topic ID
 */
const topicById = async (request, response, next) => {
    const topicId = request.params.id;
    const field = request.supervisor.field;
    const filter = {
        topicId : topicId,
        field : field,
    }
    try {
        const topic = await Topic.findOne(filter);
        if(topic) {
            request.topic = topic;
            next();
        }
        else {
            return response.status(400).json({ message : "Topic could not be found", error : error });
        }
    }
    catch(error) {
        return response.status(400).json({ message : "Topic could not be found", error : error });
    }
};

/**
 * get a single topic
 */
const getSingleTopic = async (request, response) => {
    return response.status(200).json(request.topic);
};

/**
 * get all topics
 */
const getAllTopics = async (request, response) => {
    const state = request.params.state;
    try {
        const field = request.supervisor.field;

        const filter = {
            field : field,
        }

        if(state === "accepted") {
            filter.state = "accepted";
        }
        else if(state === "rejected") {
            filter.state = "rejected";
        }
        else if(state === "pending") {
            filter.state = "pending";
        }
        else {
            return response.status(400).json({ error : "Invalid state" });
        }

        try {
            const topics = await Topic.find(filter);
            return response.status(200).json(topics);
        }
        catch(error) {
            return response.status(400).json({ message : "Topics not found" });
        }
    }
    catch(error) {
        return response.status(400).json({ message : "Field not found", error : error });
    }
};

/**
 * update the state of topic to accepted or rejected
 */
const updateState = async (request, response) => {
    const state = request.params.state;
    const evaluated = request.topic.evaluated;

    if(state === "accepted" || state === "rejected") {
        if(!evaluated) {
            const topic = request.topic;
            const supervisor = request.supervisor;
    
            topic.state = state;
            topic.supervisorId = supervisor.id;
            topic.supervisorName = supervisor.firstName + " " + supervisor.lastName;
            topic.role = supervisor.role;
    
            const updatedTopic = new Topic(topic);
            try {
                await updatedTopic.save();
                return response.status(200).json({ message : "Update succesfull" });
            }
            catch(error) {
                console.log(error)
                return response.status(400).json({ message : "Update failed", error : error });
            }
        }
        else {
            return response.status(400).json({ error : "Cannot change state after evaluation" });
        }
    }
    else {
        return response.status(400).json({ error : "Invalid state" });
    }
};

/**
 * get the documents uploaded by admin
 */
const getDocuments = async (_request, response) => {
    try {
        const documents = await Document.find({ "staffAllowed" : true });
        return response.status(200).json(documents);
    }
    catch(error) {
        return response.status(400).json({ message : "Unable to fetch documents", error : error });
    }
};

/**
 * middleware
 * get the group IDs that the supervisor is assigned to
 */
const groupIDs = async (request, response, next) => {
    try {
        const groupIDs = await Topic.find({ "supervisorId" : request.supervisor.id }).select("groupId -_id");

        var IDArray = [];

        groupIDs.forEach((id) => {
            IDArray.push(id.groupId);
        });

        request.groupIDs = IDArray;
        next();
    }
    catch(error) {
        return response.status(400).json({ error : error, message : "Unable to fetch relevant group IDs" });
    }
}

/**
 * get the groups that the supervisor is assigned to
 */
const getAssignedGroups = async (request, response) => {
    try {
        const groups = await Group.find({ "groupId" : request.groupIDs });
        return response.status(200).json(groups);
    }
    catch(error) {
        return response.status(400).json({ error : error, message : "Unable to fetch relevant groups" });
    }    
};

/**
 * get submissions from the students groups that the supervisor is assigned to
 */
const getStudentDocuments = async (request, response) => {
    const type = request.params.type;
    
    const filter = {
        "groupId" : request.groupIDs,
        "type" : type,
        "marked" : false
    };

    try {
        const documents = await StudentDocument.find(filter);
        return response.status(200).json(documents);
    }
    catch(error) {
        return response.status(400).json({ error : error, message : "Unable to fetch documents" });
    }
};

/**
 * get a single submission from the relevant groups
 */
const getStudentDocument = async (request, response) => {
    const id = request.params.id;

    try {
        const document = await StudentDocument.findById(id);
        return response.status(200).json(document);
    }
    catch(error) {
        return response.status(400).json({ error : error, message : "Unable to fetch the document" });
    }
};

/**
 * get a single group
 */
const getGroup = async (request, response) => {
    const groupId = request.params.id;

    try {
        const group = await Group.findOne({ groupId : groupId });
        return response.status(200).json(group);
    }
    catch(error) {
        return response.status(400).json({ error : "Unable to find the group" });
    }
}

/**
 * evaluate document by providing marks for each members
 */
const evaluateDocument = async (request, response) => {
    const marks = request.body.marks;
    const groupId = request.params.id;

    /**
     * If no records having the group ID available in the collection create new document
     * If document exist having the group ID update document
     */

    try {
        const result = await Result.findOne({ "groupId" : groupId });
        if(result) {
            result.student1.documentMarks = marks.student1;
            result.student2.documentMarks = marks.student2;
            result.student3.documentMarks = marks.student3;
            result.student4.documentMarks = marks.student4;

            try {
                await result.save();
                return response.status(200).json({ message : "Evaluation succesfull" });
            }
            catch(error) {
                return response.status(400).json({ error : "Unable to submit the evaluation" });
            }
        }
        else {
            var newResult = new Result();

            try {
                const group = await Group.findOne({ "groupId" : groupId });
        
                newResult.groupId = groupId;
                newResult.student1.studentId = group.student1;
                newResult.student1.documentMarks = marks.student1
                newResult.student2.studentId = group.student2;
                newResult.student2.documentMarks = marks.student2
                newResult.student3.studentId = group.student3;
                newResult.student3.documentMarks = marks.student3
                newResult.student4.studentId = group.student4;
                newResult.student4.documentMarks = marks.student4
        
                try {
                    await newResult.save();
                    return response.status(200).json({ message : "Evaluation succesfull" });
                }
                catch(error) {
                    return response.status(400).json({ error : "Unable to submit the evaluation" });
                }
            }
            catch(error) {
                return response.status(400).json({ error : "Unable to find the group" });
            }
        }
    }
    catch(error) {
        return response.status(400).json({ error : "Unable to find a result" });
    }
};

/**
 * evaluate final thesis by providing marks for each members
 */
const evaluateFinalThesis = async (request, response) => {
    const marks = request.body;
    const groupId = request.params.id;

    /**
     * If no records having the group ID available in the collection create new document
     * If document exist having the group ID update document
     */

    try {
        const result = await Result.findOne({ "groupId" : groupId });
        if(result) {
            result.student1.finalThesisMarks = marks.student1;
            result.student2.finalThesisMarks = marks.student2;
            result.student3.finalThesisMarks = marks.student3;
            result.student4.finalThesisMarks = marks.student4;

            try {
                await result.save();
                return response.status(200).json({ message : "Evaluation succesfull" });
            }
            catch(error) {
                return response.status(400).json({ error : "Unable to submit the evaluation" });
            }
        }
        else {
            var newResult = new Result();

            try {
                const group = await Group.findOne({ "groupId" : groupId });
        
                newResult.groupId = groupId;
                newResult.student1.studentId = group.student1;
                newResult.student1.finalThesisMarks = marks.student1
                newResult.student2.studentId = group.student2;
                newResult.student2.finalThesisMarks = marks.student2
                newResult.student3.studentId = group.student3;
                newResult.student3.finalThesisMarks = marks.student3
                newResult.student4.studentId = group.student4;
                newResult.student4.finalThesisMarks = marks.student4
        
                console.log(newResult);
        
                try {
                    await newResult.save();
                    return response.status(200).json({ message : "Evaluation succesfull" });
                }
                catch(error) {
                    return response.status(400).json({ error : "Unable to submit the evaluation" });
                }
            }
            catch(error) {
                return response.status(400).json({ error : "Unable to find the group" });
            }
        }
    }
    catch(error) {
        return response.status(400).json({ error : "Unable to find a result" });
    }
};

/**
 * update document if the document is evaluated
 */
const updateDocumentState = async (request, response) => {
    const documentId = request.params.id;

    try {
        const document = await StudentDocument.findById(documentId);
        if(document) {
            document.marked = true;

            try {
                await document.save();
                return response.status(200).json({ message : "Update succesfull" });
            }
            catch(error) {
                return response.status(400).json({ error : "Update failed" });
            }
        }
    }
    catch(error) {
        return response.status(400).json({ error : "Unable to find document" });
    }
};

export {
    topicById,
    getSingleTopic,
    getAllTopics,
    updateState,
    getDocuments,
    groupIDs,
    getAssignedGroups,
    getStudentDocuments,
    getStudentDocument,
    getGroup,
    evaluateDocument,
    evaluateFinalThesis,
    updateDocumentState
};