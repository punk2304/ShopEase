const nodemailer = require("nodemailer");
const otpSignUp = require("../templates/otpSignUp")


const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'Papyrus',
                name:'Papyrus | NIT kurukshetra',
                to:`${email}`,
                subject: `${title}`,
                html: otpSignUp(),
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;





// `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//                 <div style="margin:50px auto;width:70%;padding:20px 0">
//                   <div style="border-bottom:1px solid #eee">
//                     <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Papyrus</a>
//                   </div>
//                   <p style="font-size:1.1em">Hi,</p>
//                   <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
//                   <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"> ${body} </h2>
//                   <p style="font-size:0.9em;">Regards,<br />Papyrus</p>
//                   <hr style="border:none;border-top:1px solid #eee" />
//                   <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">ß
//                     <p>Papyrus</p>
                
//                     <p>India</p>
//                   </div>
//                 </div>
//               </div>`