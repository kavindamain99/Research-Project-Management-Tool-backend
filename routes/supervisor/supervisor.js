import express from 'express';

import authorize from '../../helpers/supervisor/authorization.js'

import {
    signUp,
    signIn
} from '../../controllers/supervisor/registration.js';

import {
    topicById,
    getSingleTopic,
    getAllTopics,
    updateState
} from '../../controllers/supervisor/supervisor.js';

const router = express.Router();

router.post('/supervisor/signup', signUp);
router.post('/supervisor/signin', signIn);

router.get('/supervisor/topic/:id', authorize, topicById, getSingleTopic);
router.get('/supervisor/topics/:state', authorize, getAllTopics);

router.put('/supervisor/topic/:id/:state', authorize, topicById, updateState);

export default router;