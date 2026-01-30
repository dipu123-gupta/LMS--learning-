import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,        // smtp.gmail.com
      port: Number(process.env.SMTP_PORT),// 587
      secure: false,                      // 587 ke liye false
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,  // 16-digit App Password
      },
    });

    //  SMTP connection test
    await transporter.verify();
    console.log("SMTP server connected");

    const mailOptions = {
      from: `"Support Team" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

  } catch (error) {
    console.error(" REAL SMTP ERROR", error);
    throw error; // real error controller tak jayega
  }
};

export default sendEmail;
