"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mailgunjs = require('mailgun-js'); var _mailgunjs2 = _interopRequireDefault(_mailgunjs);
var _email = require('../../config/email'); var _email2 = _interopRequireDefault(_email);

class EmailController {
  async send(req, res, next) {
    const { name, email, message } = req.body;
    const content = `name: ${name} \n email: ${email} \n message: ${message}`;
    const domain = _email2.default.MAILGUN_USER;
    const mailgun = new (0, _mailgunjs2.default)({ apiKey: _email2.default.MAILGUN_API_KEY, domain });
    const data = {
      // Specify email data
      from: email,
      // The email to contact
      to: 'denisforigo@gmail.com',
      // Subject and text data
      subject: 'Mensagem enviada pelo Site',
      html: content,
    };
    // Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, (err, body) => {
      // If there is an error, render the error page
      if (err) {
        res.status(404).json({ error: err });
        console.log('got an error: ', err);
      }
      // Else we can greet    and leave
      else {
        // Here "submitted.jade" is the view file for this landing page
        // We pass the variable "email" from the url parameter in an object rendered by Jade
        res.status(200).json({ email });
        console.log(body);
      }
    });
  }
}

exports. default = new EmailController();
