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
routes.get('/pages/:id', PageController.index);

routes.get('/albums', AlbumController.index);
routes.get('/albums/:id', AlbumController.index);

routes.get('/files', FileController.index);
routes.get('/files/:id', FileController.index);

// routes.use(authMiddleware);

routes.delete('/pages/:id', PageController.delete);
routes.post('/pages', PageController.store);
routes.put('/pages/:id', PageController.update);

routes.post('/albums', AlbumController.store);
routes.delete('/albums/:id', AlbumController.delete);
routes.put('/albums/:id', AlbumController.update);

routes.get('/users', UserController.index);
routes.put('/users', authMiddleware, UserController.update);

routes.delete('/files/:id', FileController.delete);
routes.delete('/files/all', FileController.delete_all);

// routes.post('/files', upload.single('files'), FileController.store);
routes.post('/files', upload.array('files'), (req, res) => {
  console.log(res.json(req.files));
  return null;
}); // changed single to array to upload multiple files.

routes.post('/send', EmailController.send);

export default routes;
