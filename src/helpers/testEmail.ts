import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const auth = {
  auth: {
    api_key: 'd95800d6601f7c00881a11b45a677d00-a65173b1-79344ae9',
    domain: 'sandboxed7019670ac24489a49ee1a41d26bda1.mailgun.org',
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

nodemailerMailgun.sendMail(
  {
    from: 'support@equites.com',
    to: 'viktor.developer96@gmail.com',
    subject: 'Hola que hace!',
    html: '<b>Wow Big powerful letters</b><br/>!',
  },
  (err: Error | null, info: nodemailer.SentMessageInfo) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`Response: ${info}`);
    }
  },
);
