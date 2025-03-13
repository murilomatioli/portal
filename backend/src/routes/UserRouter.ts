import { Router } from 'express';
import { UserComponent } from '../components/';
import { authenticateJWT } from '../components/Auth/AuthMiddleware';

const router: Router = Router();
//post
router.post('/createUser', UserComponent.createUser);
router.post('/login', UserComponent.loginUser);

//delete
// @ts-ignore
router.delete('/deleteUser/:id', authenticateJWT, UserComponent.deleteUser);

//get
// @ts-ignore
router.get('/user/:id', authenticateJWT, UserComponent.getUser);

// @ts-ignore
router.put('/user/:id', authenticateJWT, UserComponent.putUser);

export default router;
