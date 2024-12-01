import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BikeRoutes } from './modules/bike/product.route';
import { OrdersRoute } from './modules/order/order.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', BikeRoutes);

app.use('/api/orders', OrdersRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
