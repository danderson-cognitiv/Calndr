import * as dotenv from 'dotenv';
import {App} from './routes/App';
const cors = require('cors');


dotenv.config();

//todo check these for null
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const mongoDBConnection = process.env.CLOUD_DB_CONNECTION_STRING || 'mongodb://' + dbUser + ':' + encodeURIComponent("test") + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);

const corsOptions = {
    origin: 'http://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };

const app = new App();
app.initializeDatabaseModels(mongoDBConnection);
let server: any = app.expressApp;
server.use(cors(corsOptions))
server.listen(port);
console.log("server running in port " + port);