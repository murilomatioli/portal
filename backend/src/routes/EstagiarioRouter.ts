import { Router } from 'express';
import { EstagiarioComponent } from '../components';
import { authenticateJWT } from '../config/auth/AuthMiddleware';

const router: Router = Router();
//@ts-ignore
//prettier-ignore
router.post('/cadEstagiario', authenticateJWT, EstagiarioComponent.cadEstagiario);
router.get('/getEstagiario', EstagiarioComponent.getEstagiarios);

export default router;
