import * as dotenv from 'dotenv';
import {App} from './routes/App';
const cors = require('cors');


dotenv.config();

//todo check these for null
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent("test") + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);

const corsOptions = {
    origin: 'http://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };

const app = new App();

export function startApiServer(): Promise<{ serverInstance: any; message: string }> {
  return app.initializeDatabaseModels(mongoDBConnection).then(() => {
    const server = app.expressApp;
    server.use(cors(corsOptions));
    return new Promise<{ serverInstance: any; message: string }>((resolve) => {
      const listener = server.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve({
          serverInstance: listener,
          message: 'Server is up and running'
        });
      });
    });
  }).catch(err => {
    console.error('Failed to initialize database models:', err);
    throw err;
  });
}