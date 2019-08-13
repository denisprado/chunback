import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import PageController from './app/controllers/PageController';
import SessionController from './app/controllers/SessionController';
import AlbumController from './app/controllers/AlbumController';
import EmailController from './app/controllers/EmailController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/pages', PageController.index);
routes.delete('/pages/:id', PageController.delete);
routes.get('/pages/:id', PageController.index);
routes.post('/pages', PageController.store);
routes.put('/pages', PageController.update);

routes.get('/albums', AlbumController.index);
routes.get('/albums/:id', AlbumController.index);

// routes.use(authMiddleware);

routes.post('/albums', AlbumController.store);
routes.put('/albums', AlbumController.update);

routes.get('/users', UserController.index);
routes.put('/users', authMiddleware, UserController.update);

routes.get('/files', FileController.index);
routes.get('/files/:id', FileController.index);
routes.delete('/files/:id', FileController.delete);
routes.delete('/files/all', FileController.delete_all);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/send', EmailController.send);

export default routes;
