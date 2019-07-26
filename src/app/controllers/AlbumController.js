import * as Yup from 'yup';
import Album from '../models/Album';
import File from '../models/File';

class AlbumController {
  async index(req, res) {
    if (req.params.id) {
      const album = await Album.findAll({
        include: [{ model: File }],
        where: { id: req.params.id },
      });
      return res.json(album);
    }

    const albums = await Album.findAll({
      include: [{ model: File }],
    });

    return res.json(albums);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const AlbumExists = await Album.findOne({
      where: { title: req.body.title },
    });

    if (AlbumExists) {
      return res.status(400).json({ error: 'Album alredy exists.' });
    }
    const { id, title, content, images_ids } = await Album.create(req.body);

    return res.json({ id, title, content, images_ids });
  }


  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const album = await Album.findByPk(req.body.id);

    const { id, title, content } = await album.update(req.body);

    return res.json({ id, title, content });
  }
}

export default new AlbumController();
