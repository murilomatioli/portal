import { Router } from 'express';
import { UserComponent } from '../components/';

const router: Router = Router();

router.post('/createUser', UserComponent.createUser);
router.post('/login', UserComponent.loginUser);

export default router;
