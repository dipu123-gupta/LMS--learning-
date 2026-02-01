// import nodemailer from "nodemailer";

// const sendEmail = async (email, subject, message) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST, // smtp.gmail.com
//       port: Number(process.env.SMTP_PORT), // 587
//       secure: false, // 587 ke liye false
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     //  SMTP connection test
//     await transporter.verify();
//     console.log("SMTP server connected");

//     const mailOptions = {
//       from: `"Support Team" <${process.env.SMTP_FROM_EMAIL}>`,
//       to: email,
//       subject: subject,
//       html: message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error(" REAL SMTP ERROR", error);
//     throw error; // real error controller tak jayega
//   }
// };

// export default sendEmail;

import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // 587 ke liye
      auth: {
        user: process.env.SMTP_USER, // ✅ FIXED
        pass: process.env.SMTP_PASS, // ✅ FIXED
      },
    });

    transporter.verify((err, success) => {
      if (err) {
        console.error("SMTP VERIFY ERROR 👉", err);
      } else {
        console.log("SMTP READY");
      }
    });

    console.log("SMTP server connected");

    await transporter.sendMail({
      from: `"Support Team" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject,
      html: message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("REAL SMTP ERROR", error);
    throw error;
  }
};

export default sendEmail;
