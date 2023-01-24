import nodeMailer from "nodemailer";

const emailSend = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "SendinBlue",
    auth: {
      pass: process.env.MAIL_PASSWORD,
      user: process.env.MAIL_SEND,
    },
  });

  const { to, subject, html } = options;

  await transporter.sendMail({
    from: `Instant NYC ${process.env.MAIL_SEND}`,
    to,
    subject,
    html,
  });
};

export default emailSend;
