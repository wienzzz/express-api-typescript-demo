import { Router } from 'express';
import { doLogin } from '../controller/login.controller';
const loginRouter = Router();

loginRouter.post('/', doLogin);

export default loginRouter;
