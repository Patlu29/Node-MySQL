import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(bodyParser.json());


AppDataSource.initialize().then(() => {

    console.log("Connected to database");

    app.use('/auth', authRoutes);

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});