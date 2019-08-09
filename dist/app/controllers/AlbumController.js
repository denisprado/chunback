"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Album = require('../models/Album'); var _Album2 = _interopRequireDefault(_Album);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class AlbumController {
  async index(req, res) {
    // Adiciona headers adequados para o react-admin
    const count = await _Album2.default.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
    res.setHeader(
      'Access-Control-Allow-Origin',
      `https://chun-front.herokuapp.com`
    );
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
    if (req.params.id) {
      // Retorna a busca por arquivos de um álbum
      if (req.query.files) {
        const files = await _File2.default.findAll({
          where: {
            AlbumId: req.params.id,
          },
        });
        return res.send(files);
      }

      // Retorna a busca por um ábum específico
      const album = await _Album2.default.findByPk(req.params.id, {
        include: [{ all: true }],
      });
      return res.send(album);
    }

    // Retorna todos os albums (req.params.is é nullo)
    const albums = await _Album2.default.findAll({
      include: [{ all: true }],
    });

    return res.json(albums);
  }

  // Cadastra um álbum
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const AlbumExists = await _Album2.default.findOne({
      where: { title: req.body.title },
    });

    if (AlbumExists) {
      return res.status(400).json({ error: 'Album alredy exists.' });
    }
    const { id, title, content, images_ids } = await _Album2.default.create(req.body);

    return res.json({ id, title, content, images_ids });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),
      thumb: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const album = await _Album2.default.findByPk(req.body.id);

    const { id, title, content } = await album.update(req.body);

    return res.json({ id, title, content });
  }
}

exports. default = new AlbumController();
