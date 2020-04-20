import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {createConnection} from 'typeorm';
import {databaseConfig} from "./configs/database.config";
import {seed} from "./test/mock-data";
import {userRouter} from "./routes/user.route";
import {courseRouter} from "./routes/course.route";


const app = express();

app.use(cors({
    origin: (_, allow) => allow(null, true),
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.all('*', (req, _, next) => {
   console.log(JSON.stringify({ time: new Date().toISOString(), method: req.method, path: req.path, ip: req.ip, userAgent: req.headers["user-agent"], contentType: req.headers["content-type"] }));
   next();
});

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

(async () => {
    const connection = await createConnection(databaseConfig);
    await connection.synchronize(true);

    await seed();

    app.listen(4000, () => console.log('Server running on port 4000'));
})();