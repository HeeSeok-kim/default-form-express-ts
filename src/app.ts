import express from 'express';
import routes from './routes';
import dotenv from "dotenv"
import sequelize from "./models/index";

import { errorLogger,errorHandler } from './middlewares/error-handler-middleware';
dotenv.config()

const app = express();
app.use(express.json());

app.use('/api', routes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    console.log(`server is running on ${process.env.PORT}`);
    await sequelize.authenticate()
        .then(async () => {
            console.log("connection success");
        })
        .catch((e) => {
            console.log('TT : ', e);
        })
});
