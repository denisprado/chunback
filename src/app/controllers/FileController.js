import File from '../models/File';

class FileControler {
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
}

export default new FileControler();
