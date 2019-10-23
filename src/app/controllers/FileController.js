import File from '../models/File';

class FileControler {
  async index(req, res) {
    const count = await File.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
    res.setHeader('Access-Control-Allow-Origin', `*`);
    if (req.params.id) {
      const file = await File.findByPk(req.params.id);

      return res.send(file);
    }
    const files = await File.findAll();
    return res.json(files);
  }

  async store(req, res) {
    console.log(req.body);
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
    return res.send(file[0]);
  }

  async delete_all(req, res) {
    const file = await File.destroy({
      truncate: true,
    });
    return res.json(file);
  }
}

export default new FileControler();
