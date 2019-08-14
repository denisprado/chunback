import * as Yup from 'yup';
import Album from '../models/Album';
import File from '../models/File';

class AlbumController {
  async index(req, res) {
    // Adiciona headers adequados para o react-admin
    const count = await Album.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
    res.setHeader('Access-Control-Allow-Origin', `*`);
    if (req.params.id) {
      // Retorna a busca por arquivos de um álbum
      if (req.query.files) {
        const files = await File.findAll({
          where: {
            AlbumId: req.params.id,
          },
        });
        return res.send(files);
      }

      // Retorna a busca por um ábum específico
      const album = await Album.findByPk(req.params.id, {
        include: [{ all: true }],
      });
      return res.send(album);
    }

    // Retorna todos os albums (req.params.is é nullo)
    const albums = await Album.findAll({
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
      thumb: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const album = await Album.findByPk(req.params.id);
    const updatedAlbum = await album.update(req.body);
    return res.send(updatedAlbum);
  }

  async delete(req, res) {
    try {
      Album.destroy({ where: { id: req.params.id } });
      return null;
    } catch (err) {
      return res.send(err);
    }
  }
}

export default new AlbumController();
