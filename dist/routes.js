"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _PageController = require('./app/controllers/PageController'); var _PageController2 = _interopRequireDefault(_PageController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _AlbumController = require('./app/controllers/AlbumController'); var _AlbumController2 = _interopRequireDefault(_AlbumController);
var _EmailController = require('./app/controllers/EmailController'); var _EmailController2 = _interopRequireDefault(_EmailController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);

routes.get('/pages', _PageController2.default.index);
routes.get('/pages/:id', _PageController2.default.index);

routes.get('/albums', _AlbumController2.default.index);
routes.get('/albums/:id', _AlbumController2.default.index);

routes.get('/files', _FileController2.default.index);
routes.get('/files/:id', _FileController2.default.index);

// routes.use(authMiddleware);

routes.delete('/pages/:id', _PageController2.default.delete);
routes.post('/pages', _PageController2.default.store);
routes.put('/pages/:id', _PageController2.default.update);

routes.post('/albums', _AlbumController2.default.store);
routes.delete('/albums/:id', _AlbumController2.default.delete);
routes.put('/albums/:id', _AlbumController2.default.update);

routes.get('/users', _UserController2.default.index);
routes.put('/users', _auth2.default, _UserController2.default.update);

routes.delete('/files/:id', _FileController2.default.delete);
routes.delete('/files/all', _FileController2.default.delete_all);

// routes.post('/files', upload.single('files'), FileController.store);
routes.post('/files', upload.array('files', 100), _FileController2.default.store); // changed single to array to upload multiple files.

routes.post('/send', _EmailController2.default.send);

exports. default = routes;
