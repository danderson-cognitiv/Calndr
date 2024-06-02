import { Request, Response, NextFunction } from 'express';

export class AuthUtils {
    static validateAuth(req: Request, res: Response, next: NextFunction): void {
        if (req.isAuthenticated()) {
            console.log("User is authenticated");
            console.log(JSON.stringify(req.user));
            return next();
        }
        res.redirect('/auth/google');
    }
}
