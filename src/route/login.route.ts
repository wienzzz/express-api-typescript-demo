import { Router } from 'express';
import { doLogin } from '../controller/login.controller';
const loginRouter = Router();

/* GET programming languages. */
loginRouter.post('/', doLogin);

export default loginRouter;
