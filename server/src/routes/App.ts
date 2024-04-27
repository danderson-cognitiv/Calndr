import express from 'express';
import * as bodyParser from 'body-parser';
import createUserRoutes from './UserRoutes';
import createEventRoutes from './EventRoutes';
import createUserEventRoutes from './UserEventRoutes';
import createMessageRoutes from './MessageRoutes';
import createPhotoRoutes from './PhotoRoutes';

class App {
    // ref to Express instance
    public expressApp: express.Application;

    constructor(mongoDBConnection: string) {
        this.expressApp = express();
        this.middleware();
        this.routes(mongoDBConnection); // Pass mongoDBConnection to routes function
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private routes(mongoDBConnection: string): void {
        // Use user routes
        this.expressApp.use('/', createUserRoutes(mongoDBConnection));
        this.expressApp.use('/', createEventRoutes(mongoDBConnection));
        this.expressApp.use('/', createUserEventRoutes(mongoDBConnection));
        this.expressApp.use('/', createMessageRoutes(mongoDBConnection));
        this.expressApp.use('/', createPhotoRoutes(mongoDBConnection));


        // Serve static files
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}

export { App };
