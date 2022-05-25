import Topic from '../../models/supervisor/topic.js';
import Supervisor from '../../models/supervisor/supervisor.js';

const topicById = async (request, response, next) => {
    const topicId = request.params.id;
    try {
        const topic = await Topic.findOne({ topicId : topicId });
        request.topic = topic;
        next();
    }
    catch(error) {
        response.status(400).json({ message : "Topic could not be found", error : error });
    }
};

const getSingleTopic = async (request, response) => {
    response.status(200).json(request.topic);
};

const getAllTopics = async (request, response) => {
    const supervisorId = request.supervisorLogged[0].id;
    const state = request.params.state;
    try {
        var field = await Supervisor.find({ id : supervisorId }, 'field');
        field = field[0].field;

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
    const topic = request.topic;
    topic.state = state;
    const updatedTopic = new Topic(topic);
    try {
        await updatedTopic.save();
        response.status(200).json({ message : "Update succesfull" });
    }
    catch(error) {
        response.state(400).json({ message : "Update failed", error : error });
    }
}

export {
    topicById,
    getSingleTopic,
    getAllTopics,
    updateState
}