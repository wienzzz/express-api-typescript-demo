import express, { Express, Request, Response} from 'express'
import dotenv from 'dotenv';
import itemRouter from './route/item.route';
import loginRouter from './route/login.route';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({'message': 'ok'});
})
app.use('/item', itemRouter);
app.use('/login',loginRouter);
/* Error handler middleware */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}); 