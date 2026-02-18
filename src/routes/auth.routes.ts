import { Router } from 'express';
import authLoginController from '../controllers/auth/login.controller';
import authLogoutController from '../controllers/auth/logout.controller';
import authRefreshController from '../controllers/auth/refresh.controller';
import authRegisterController from '../controllers/auth/register.controller';

const authRoute = Router();

authRoute.post('/register', authRegisterController);
authRoute.post('/login', authLoginController);
authRoute.post('/refresh', authRefreshController);
authRoute.post('/logout', authLogoutController);

export default authRoute;
