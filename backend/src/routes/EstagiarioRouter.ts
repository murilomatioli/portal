import { Router } from 'express';
import { cadEstagiario, getEstagiarios } from '../components/Estagiario';
import { authenticateJWT } from '../config/auth/AuthMiddleware';

const router: Router = Router();
//@ts-ignore
//prettier-ignore
router.get('/', getEstagiarios);
// @ts-ignore
router.post('/', authenticateJWT, cadEstagiario);

//configurando o multer

export default router;
