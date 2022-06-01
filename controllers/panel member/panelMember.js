import Topic from '../../models/supervisor/topic.js';

const topicById = async (request, response, next) => {
    const topicId = request.params.id;
    const filter = {
        topicId : topicId,
        state : "accepted"
    };
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

const getSingleTopic = async (request, response) => {
    return response.status(200).json(request.topic);
};

const getAllTopics = async (request, response) => {
    const state = request.params.state;
    const filter = {
        state : "accepted",
        evaluated : state
    }
    try {
        const topics = await Topic.find(filter);
        return response.status(200).json(topics);
    }
    catch(error) {
        return response.status(400).json({ message : "Topics not found", error : error });
    }
};

const evaluateTopic = async (request, response) => {
    console.log(12346)
    const topic = request.topic;

    topic.panelMemberId = request.panelMember.id;
    topic.panelMemberName = request.panelMember.firstName + " " + request.panelMember.lastName;
    topic.evaluated = true;
    topic.evaluation = request.body.evaluation;

    const evaluatedTopic = new Topic(topic);
    try {
        await evaluatedTopic.save();
        return response.status(200).json({ message : "Update succesfull" });
    }
    catch(error) {
        return response.status(400).json({ message : "Update failed", error : error });
    }
}

export {
    topicById,
    getSingleTopic,
    getAllTopics,
    evaluateTopic
};