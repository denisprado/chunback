import * as Yup from 'yup';
import Page from '../models/Page';

class PageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const PageExists = await Page.findOne({ where: { title: req.body.title } });

    if (PageExists) {
      return res.status(400).json({ error: 'Page alredy exists.' });
    }
    const { id, title, content } = await Page.create(req.body);

    return res.json({ id, title, content });
  }

  async index(req, res) {
    const Pages = await Page.findAll();

    return res.json(Pages);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, title, content } = await Page.update(req.body);

    return res.json({ id, title, content });
  }
}

export default new PageController();
