import Topic from '../../models/supervisor/topic.js';
import Document from '../../models/supervisor/document.js';

const topicById = async (request, response, next) => {
    const topicId = request.params.id;
    const field = request.supervisor.field;
    const filter = {
        topicId : topicId,
        field : field,
    }
    try {
        const topic = await Topic.findOne(filter);
        console.log(topic)
        if(topic) {
            request.topic = topic;
            next();
        }
        else {
            response.status(400).json({ message : "Topic could not be found", error : error });
        }
    }
    catch(error) {
        response.status(400).json({ message : "Topic could not be found", error : error });
    }
};

const getSingleTopic = async (request, response) => {
    response.status(200).json(request.topic);
};

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
            response.status(400).json({ error : "Invalid state" });
        }

        try {
            const topics = await Topic.find(filter);
            response.status(200).json(topics);
        }
        catch(error) {
            response.status(400).json({ message : "Topics not found" });
        }
    }
    catch(error) {
        response.status(400).json({ message : "Field not found", error : error });
    }
};

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
                response.status(200).json({ message : "Update succesfull" });
            }
            catch(error) {
                response.status(400).json({ message : "Update failed", error : error });
            }
        }
        else {
            response.status(400).json({ error : "Cannot change state after evaluation" });
        }
    }
    else {
        response.status(400).json({ error : "Invalid state" });
    }
};

const getDocuments = async (_request, response) => {
    try {
        const documents = await Document.find();
        response.status(200).json(documents);
    }
    catch(error) {
        response.status(400).json({ message : "Unable to fetch documents", error : error });
    }
}

export {
    topicById,
    getSingleTopic,
    getAllTopics,
    updateState,
    getDocuments
};