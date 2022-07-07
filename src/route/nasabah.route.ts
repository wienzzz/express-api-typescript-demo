import { Router } from 'express';
import { getNasabah, searchNasabah } from '../controller/nasabah.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const nasabahRouter = Router();

/* GET programming languages. */
nasabahRouter.get('/batch',authenticateToken, getNasabah);
nasabahRouter.get('/batch-no-auth', getNasabah);
nasabahRouter.get('/search',authenticateToken, searchNasabah);
nasabahRouter.get('/search-no-auth', searchNasabah);

export default nasabahRouter;
