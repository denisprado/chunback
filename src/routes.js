import { Router } from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import multerConfig from './config/multer';
import creds from './config/email';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import PageController from './app/controllers/PageController';
import SessionController from './app/controllers/SessionController';
import AlbumController from './app/controllers/AlbumController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/pages', PageController.index);
routes.get('/pages/:id', PageController.index);

routes.get('/albums', AlbumController.index);
routes.get('/albums/:id/files', AlbumController.index);
routes.get('/albums/:id', AlbumController.index);

// routes.use(authMiddleware);

routes.post('/pages', PageController.store);
routes.put('/pages', PageController.update);

routes.post('/albums', AlbumController.store);
routes.put('/albums', AlbumController.update);

routes.get('/users', UserController.index);
routes.put('/users', authMiddleware, UserController.update);

routes.get('/files/:id', FileController.index);
routes.delete('/files/:id', FileController.delete);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/send', (req, res, next) => {
  const { name, email, message } = req.body;
  const content = `name: ${name} \n email: ${email} \n message: ${message}`;

  const mail = {
    from: name,
    to: 'denisforigo@gmail.com',
    subject: 'New Message from Contact Form',
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ msg: 'Houve algum erro no envio' });
    } else {
      res.json({
        msg: 'Email enviado com sucesso! Entraremos em contato em breve.'
      });
    }
  });
});

export default routes;
