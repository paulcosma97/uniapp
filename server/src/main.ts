import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {createConnection} from 'typeorm';
import {databaseConfig} from "./configs/database.config";
import {seed} from "./test/mock-data";


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', (req, _, next) => {
   console.log({ time: new Date().toISOString(), path: req.path });
   next();
});

(async () => {
    const connection = await createConnection(databaseConfig);
    await connection.synchronize(true);

    await seed();

    app.listen(4000, () => console.log('Server running on port 4000'));
})();