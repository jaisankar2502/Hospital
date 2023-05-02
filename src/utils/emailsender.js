const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev.jaisankar.0712@gmail.com',
    pass:'dftxvdlkxqxoosyh',
  }
});


const sendEmail = async (email) => {
    const mailOptions = {
      from:'dev.jaisankar.0712@gmail.com' ,
      to: email,
      subject: 'Patient Registration',
      html: `<p>Dear ${email}, Thank you for choosing our healthcare provider. We are delighted to have you as a patient. Please fill out the attached patient registration form and return it to us at your earliest convenience. This form will provide us with the necessary information to create your patient record and ensure that we can provide you with the best possible care. If you have any questions or need assistance in completing the form, please do not hesitate to contact our office. Thank you for your cooperation. We look forward to serving you.</p>`
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      return error;
    }
  };
module.exports={sendEmail}
