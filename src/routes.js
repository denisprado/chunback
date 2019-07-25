import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import PageController from './app/controllers/PageController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);


routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/pages', PageController.store);
routes.get('/pages', PageController.index);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
