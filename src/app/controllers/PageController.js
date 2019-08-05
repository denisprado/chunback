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

    return res.json({ id, title, content, image_id });
  }

  async index(req, res) {
    const cached = await Cache.get('pages');

    if (cached) {
      return res.json(cached);
    }

    const count = await Page.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
    if (req.params.id) {
      const page = await Page.findByPk(req.params.id, {
        include: [{ model: File, as: 'image' }],
      });
      return res.send(page);
    }

    const pages = await Page.findAll({
      include: [{ model: File, as: 'image' }],
    });

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

    const { id, title, content, image_id } = await page.update(req.body);

    return res.json({ id, title, content, image_id });
  }
}

export default new PageController();
