import express from 'express';

import { panelMemberAuthorization } from '../../helpers/supervisor/authorization.js';

import {
    topicById,
    getSingleTopic,
    getAllTopics,
    evaluateTopic
} from '../../controllers/panel member/panelMember.js';

import {
    signUp,
    signIn
} from '../../controllers/panel member/registration.js';

const router = express.Router();

router.post('/panelmember/signup', signUp);
router.post('/panelmember/signin', signIn);

router.get('/panelmember/topic/:id', panelMemberAuthorization, topicById, getSingleTopic);
router.get('/panelmember/topics/:state', panelMemberAuthorization, getAllTopics);

router.put('/panelmember/topic/:id', panelMemberAuthorization, topicById, evaluateTopic);

export default router;