import { Router } from 'express';
import { signupSchema } from '../schemas/auth.schema';
import { validate } from '../middlewares/validate';
import { signupController } from '../controllers/auth.controller';

const router = Router();
router.post('/signup', validate(signupSchema), signupController);
export default router;
