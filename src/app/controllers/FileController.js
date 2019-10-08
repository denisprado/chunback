import File from '../models/File';

class FileControler {
  async index(req, res) {
    const count = await File.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);

    if (req.params.id) {
      const file = await File.findByPk(req.params.id);

      return res.send(file);
    }
    const files = await File.findAll();
    return res.json(files);
  }

  async store(req, res, params) {
    // const { AlbumId } = req.body;
    req.map(re => {
      console.log(`my files: ${re}`);
    });
    // req.body.files.map(file => console.log(`Aqui: ${file}`));
    return null;
    /* const uploadedFiles = req.body.files.map(file => ({
      name: file.title,
      path: file.src,
      AlbumId,
    }));

    File.bulkCreate(uploadedFiles)
      .then(() => {
        return File.findAll();
      })
      .then(files => {
        return res.json(files);
      });
      */
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
