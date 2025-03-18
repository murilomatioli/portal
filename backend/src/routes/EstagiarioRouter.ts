import { Router } from 'express';
import { EstagiarioComponent } from '../components';

const router: Router = Router();

router.post('/cadEstagiario', EstagiarioComponent.cadEstagiario);
router.get('/getEstagiario', EstagiarioComponent.getEstagiarios);

export default router;
