const nodemailer = require("nodemailer");
class MailController {



    public async sendCode(code:String,email:String){
       try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'alqasim.engineer@gmail.com', // generated ethereal user
              pass: 'nlezwzqnpbukkgxl', // generated ethereal password
            },
          });
           // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"bahar', // sender address
    to: email, // list of receivers
    subject: "verfication Code", // Subject line
    text: "your code is ", // plain text body
    html: "<b>"+code+"</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s",email);

       } catch (error) {
        console.log("error send mail", error);
       }
    }
}


export default MailController;