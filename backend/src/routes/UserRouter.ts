import { Router } from 'express';
import { UserComponent } from '../components/';
import { authenticateJWT } from '../config/Auth/AuthMiddleware';

const router: Router = Router();
//post
router.post('/createUser', UserComponent.createUser);
router.post('/login', UserComponent.loginUser);

//delete
router.delete('/deleteUser/:id', authenticateJWT, UserComponent.deleteUser);

//get
router.get('/user/:id', authenticateJWT, UserComponent.getUser);
router.get('/getAll', authenticateJWT, UserComponent.getAllUsers);
router.put('/user/:id', authenticateJWT, UserComponent.putUser);

export default router;
