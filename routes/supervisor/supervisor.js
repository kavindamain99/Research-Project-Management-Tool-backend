import express from 'express';

import { supervisorAuthorization } from '../../helpers/supervisor/authorization.js'

import {
    signUp,
    signIn
} from '../../controllers/supervisor/registration.js';

import {
    topicById,
    getSingleTopic,
    getAllTopics,
    updateState,
    getDocuments
} from '../../controllers/supervisor/supervisor.js';

const router = express.Router();

router.post('/supervisor/signup', signUp);
router.post('/supervisor/signin', signIn);

router.get('/supervisor/topic/:id', supervisorAuthorization, topicById, getSingleTopic);
router.get('/supervisor/topics/:state', supervisorAuthorization, getAllTopics);

//test
router.get('/supervisor/documents', supervisorAuthorization, getDocuments);

router.put('/supervisor/topic/:id/:state', supervisorAuthorization, topicById, updateState);

export default router;