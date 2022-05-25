import express from 'express';

const router = express.Router();

import {
    signUp,
    signIn
} from '../../controllers/panel member/registration.js';

router.post('/panelmember/signup', signUp);
router.post('/panelmember/signin', signIn);

export default router;