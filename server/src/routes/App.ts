import express from 'express';
import * as bodyParser from 'body-parser';
import * as Mongoose from "mongoose";
import createUserRoutes from './UserRoutes';
import createEventRoutes from './EventRoutes';
import createUserEventRoutes from './UserEventRoutes';
import createMessageRoutes from './MessageRoutes';
import createPhotoRoutes from './PhotoRoutes';
import {DatabaseModels} from '../../../database/DatabaseModels';

class App {
    // ref to Express instance
    public expressApp: express.Application;

    constructor() {
        this.expressApp = express();
        this.middleware();
    }
    // com
    async initializeDatabaseModels(mongoDBConnection: string): Promise<void> {
        await DatabaseModels.initialize(mongoDBConnection);
        this.routes();
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

    private routes(): void {
        // Use user routes
        this.expressApp.use('/', createUserRoutes());
        this.expressApp.use('/', createEventRoutes());
        this.expressApp.use('/', createUserEventRoutes());
        this.expressApp.use('/', createMessageRoutes());
        this.expressApp.use('/', createPhotoRoutes());


        // Serve static files
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/../../dist/client/browser'));        
    }
}

export { App };
