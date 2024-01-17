const nodemailer = require("nodemailer");
const otpSignUp = require("../templates/otpSignUp");

const mailSender = async (email, title, body, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, 
            },
        });

        let info = await transporter.sendMail({
            from: 'Papyrus',
            to: email,
            subject: title,
            html: body(otp),
        });

        console.log("Email sent:", info);
        return info;
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

module.exports = mailSender;
