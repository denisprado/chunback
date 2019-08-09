"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _email = require('./config/email'); var _email2 = _interopRequireDefault(_email);

var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _PageController = require('./app/controllers/PageController'); var _PageController2 = _interopRequireDefault(_PageController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _AlbumController = require('./app/controllers/AlbumController'); var _AlbumController2 = _interopRequireDefault(_AlbumController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

const transporter = _nodemailer2.default.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: _email2.default.USER,
    pass: _email2.default.PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);

routes.get('/pages', _PageController2.default.index);
routes.delete('/pages/:id', _PageController2.default.delete);
routes.get('/pages/:id', _PageController2.default.index);
routes.post('/pages', _PageController2.default.store);
routes.put('/pages', _PageController2.default.update);

routes.get('/albums', _AlbumController2.default.index);
routes.get('/albums/:id', _AlbumController2.default.index);

// routes.use(authMiddleware);

routes.post('/albums', _AlbumController2.default.store);
routes.put('/albums', _AlbumController2.default.update);

routes.get('/users', _UserController2.default.index);
routes.put('/users', _auth2.default, _UserController2.default.update);

routes.get('/files', _FileController2.default.index);
routes.get('/files/:id', _FileController2.default.index);
routes.delete('/files/:id', _FileController2.default.delete);
routes.delete('/files/all', _FileController2.default.delete_all);
routes.post('/files', upload.single('file'), _FileController2.default.store);

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
        msg: 'Email enviado com sucesso! Entraremos em contato em breve.',
      });
    }
  });
});

exports. default = routes;
