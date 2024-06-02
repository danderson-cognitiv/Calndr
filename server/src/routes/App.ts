import express from 'express';
import * as bodyParser from 'body-parser';
import createUserRoutes from './UserRoutes';
import createEventRoutes from './EventRoutes';
import createUserEventRoutes from './UserEventRoutes';
import createMessageRoutes from './MessageRoutes';
import createPhotoRoutes from './PhotoRoutes';
import {DatabaseModels} from '../../../database/DatabaseModels';
import createAuthRoutes from './AuthRoutes';
import GooglePassport from '../GooglePassport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport'


class App {
    // ref to Express instance
    public expressApp: express.Application;
    public googlePassport:GooglePassport

    constructor() {
        this.googlePassport = new GooglePassport();
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
            res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
        this.expressApp.use(cookieParser());
        this.expressApp.use(session({
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
            }
        }));
        
        
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }

    private routes(): void {
        // auth routes
        this.expressApp.use('/', createAuthRoutes());
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
