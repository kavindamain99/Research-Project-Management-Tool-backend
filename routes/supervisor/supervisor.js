import express from 'express';

const router = express.Router();

import {
    signUp,
    signIn
} from '../../controllers/supervisor/supervisor.js';

router.post('/supervisor/signup', signUp);
router.post('/supervisor/signin', signIn);

export default router;