import Mailgun from 'mailgun-js';
import creds from '../../config/email';

class EmailController {
  async send(req, res, next) {
    const { name, email, message } = req.body;
    const content = `name: ${name} \n email: ${email} \n message: ${message}`;
    const domain = creds.MAILGUN_USER;
    const mailgun = new Mailgun({ apiKey: creds.MAILGUN_API_KEY, domain });
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

export default new EmailController();
