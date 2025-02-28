import express, { Router } from 'express';
import UserRouter from './UserRouter';

const router: Router = express.Router();

router.use('/users', UserRouter);

export default router;
