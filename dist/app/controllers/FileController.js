"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class FileControler {
  async index(req, res) {
    const count = await _File2.default.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
    res.setHeader('Access-Control-Allow-Origin', `*`);
    if (req.params.id) {
      const file = await _File2.default.findByPk(req.params.id);

      return res.send(file);
    }
    const files = await _File2.default.findAll();
    return res.json(files);
  }

  async store(req, res) {
    console.log(req.file);
    const { originalname: name, filename: path } = req.file;
    const { albumId: AlbumId } = req.body;

    const file = await _File2.default.create({
      name,
      path,
      AlbumId,
    });

    return res.json(file);
  }

  async update(req, res) {
    const { albumId: AlbumId } = req.body;
    const file = await _File2.default.findByPk(req.params.id);
    const fileUpdated = await file.update({ albumId: AlbumId });

    return res.json(fileUpdated);
  }

  async delete(req, res) {
    const file = await _File2.default.destroy({ where: { id: req.params.id } });
    return res.send(file[0]);
  }

  async delete_all(req, res) {
    const file = await _File2.default.destroy({
      truncate: true,
    });
    return res.json(file);
  }
}

exports. default = new FileControler();
