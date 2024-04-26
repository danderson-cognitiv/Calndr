import * as dotenv from 'dotenv';
import {App} from './routes/App';

dotenv.config();

//todo check these for null
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent("test") + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);

let server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);