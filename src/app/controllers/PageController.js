import * as Yup from 'yup';
import Page from '../models/Page';
import File from '../models/File';
import Cache from '../../lib/Cache';

class PageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string(),
      image_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const PageExists = await Page.findOne({ where: { title: req.body.title } });

    if (PageExists) {
      return res.status(400).json({ error: 'Page alredy exists.' });
    }
    const { id, title, content, image_id } = await Page.create(req.body);

    await Cache.invalidate(`pages`);
    return res.json({ id, title, content, image_id });
  }

  async index(req, res) {
    if (req.params.id) {
      const count = await Page.count();
      res.setHeader('X-Total-Count', count);
      res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
      const cached = await Cache.get(`page+${req.params.id}`);

      if (cached) {
        return res.json(cached);
      }
      const page = await Page.findByPk(req.params.id, {
        include: [{ model: File, as: 'image' }],
      });
      await Cache.set(`page+${req.params.id}`, page);
      return res.send(page);
    }
    const cached = await Cache.get('pages');

    if (cached) {
      return res.json(cached);
    }
    const count = await Page.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);

    const pages = await Page.findAll({
      include: [{ model: File, as: 'image' }],
      order: [['id', 'ASC']],
    });

    await Cache.set('pages', pages);
    return res.json(pages);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),
      image_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const page = await Page.findByPk(req.body.id);

    const page_update = await page.update(req.body);
    await Cache.invalidate(`page+${req.body.id}`);
    await Cache.invalidate(`pages`);
    return res.json(page_update);
  }

  async delete(req, res) {
    try {
      await Cache.invalidate(`pages`);
      Page.destroy({ where: { id: req.params.id } });
      return null;
    } catch (err) {
      return res.send(err);
    }
  }
}

export default new PageController();
