import { Router } from 'express';
import { UserComponent } from '../components/';
import { authenticateJWT } from '../components/Auth/AuthMiddleware';

const router: Router = Router();

router.post('/createUser', UserComponent.createUser);
router.post('/login', UserComponent.loginUser);

// @ts-ignore
router.get('/user/:id', authenticateJWT, UserComponent.getUser);

export default router;
