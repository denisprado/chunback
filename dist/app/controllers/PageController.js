"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Page = require('../models/Page'); var _Page2 = _interopRequireDefault(_Page);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
// import Cache from '../../lib/Cache';

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

    const PageExists = await _Page2.default.findOne({ where: { title: req.body.title } });

    if (PageExists) {
      return res.status(400).json({ error: 'Page alredy exists.' });
    }
    const { id, title, content, image_id } = await _Page2.default.create(req.body);

    // await Cache.invalidate(`pages`);
    return res.json({ id, title, content, image_id });
  }

  async index(req, res) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    // await Cache.invalidate(`pages`);
    if (req.params.id) {
      const count = await _Page2.default.count();
      res.setHeader('X-Total-Count', count);
      res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);
      // const cached = await Cache.get(`page+${req.params.id}`);

      /* if (cached) {
        return res.json(cached);
      } */
      const page = await _Page2.default.findByPk(req.params.id, {
        include: [{ model: _File2.default, as: 'image' }],
      });
      // await Cache.set(`page+${req.params.id}`, page);
      return res.send(page);
    }
    // const cached = await Cache.get('pages');

    /* if (cached) {
      return res.json(cached);
    } */
    const count = await _Page2.default.count();
    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', `X-Total-Count`);

    const pages = await _Page2.default.findAll({
      include: [{ model: _File2.default, as: 'image' }],
      order: [['id', 'ASC']],
    });

    // await Cache.set('pages', pages);
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

    const page = await _Page2.default.findByPk(req.params.id);
    const page_update = await page.update(req.body);

    // await Cache.invalidate(`page+${req.body.id}`);
    // await Cache.invalidate(`pages`);

    return res.send(page_update);
  }

  async delete(req, res) {
    try {
      _Page2.default.destroy({ where: { id: req.params.id } });
      // await Cache.invalidate(`pages`);
      return null;
    } catch (err) {
      return res.send(err);
    }
  }
}

exports. default = new PageController();
