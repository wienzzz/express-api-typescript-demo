import { Router } from 'express';
import { getNasabah } from '../controller/nasabah.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const nasabahRouter = Router();

/* GET programming languages. */
nasabahRouter.get('/batch',authenticateToken, getNasabah);

export default nasabahRouter;
