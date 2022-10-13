const nodeMailer=require("nodemailer")
const sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        host:process.env.smpt_host,
        port:process.env.smpt_port,
        service:process.env.smpt_service,
        auth:{
            user:process.env.smpt_mailer,
            pass:process.env.smpt_password,
        }
    });
    const mailoptions={
        from:process.env.smpt_mailer,
        to:options.email,
        subj:options.subj,
        text:options.message,

    };
    await transporter.sendEmail(mailoptions)
};
module.exports=sendEmail;