import { Router } from 'express';
import { addItem, deleteItem, getItem, editItem, listItem } from '../controller/item.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const itemRouter = Router();

/* Route without middleware first */
itemRouter.post('/', addItem);
itemRouter.put('/', editItem);
itemRouter.delete('/', deleteItem);
itemRouter.get('/list', listItem);
itemRouter.get('/', getItem);

/* Route with auth middleware first */
itemRouter.post('/v2',authenticateToken, addItem);
itemRouter.put('/v2',authenticateToken, editItem);
itemRouter.delete('/v2', authenticateToken, deleteItem);
itemRouter.get('/v2/list', authenticateToken, listItem);
itemRouter.get('/v2', authenticateToken, getItem);

export default itemRouter;
