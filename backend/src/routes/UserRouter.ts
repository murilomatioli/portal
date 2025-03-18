import { Router } from 'express';
import { UserComponent } from '../components';
import { authenticateJWT } from '../config/Auth/AuthMiddleware';

const router: Router = Router();

// POST
router.post('/createUser', UserComponent.createUser);
router.post('/login', UserComponent.loginUser);

// DELETE
//@ts-ignore
router.delete('/deleteUser/:id', authenticateJWT, UserComponent.deleteUser);

// GET
//@ts-ignore
router.get('/user/:id', authenticateJWT, UserComponent.getUser);
//@ts-ignore
router.get('/getAll', authenticateJWT, UserComponent.getAllUsers);

// PUT
//@ts-ignore
router.put('/user/:id', authenticateJWT, UserComponent.putUser);

//@ts-ignore
router.get('/getAll', authenticateJWT, UserComponent.getAllUsers);

export default router;
