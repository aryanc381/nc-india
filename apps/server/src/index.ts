import express from 'express';
import rootRouter from './routes/root.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/v1/api', rootRouter);


app.listen(5000, () => { console.log('App is listening at PORT 5000.'); });