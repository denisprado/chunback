import File from '../models/File';

class FileControler {
  async index(req, res) {
    const file = await File.findAll({ where: { id: req.params.id } });
    return res.json(file);
  }

  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { albumId: AlbumId } = req.body;

    const file = await File.create({
      name,
      path,
      AlbumId,
    });

    return res.json(file);
  }

  async update(req, res) {
    const { albumId: AlbumId } = req.body;
    const file = await File.findByPk(req.params.id);
    const fileUpdated = await file.update({ albumId: AlbumId });

    return res.json(fileUpdated);
  }

  async delete(req, res) {
    const file = await File.destroy({ where: { id: req.params.id } });
    return res.json(file);
  }
}

export default new FileControler();
