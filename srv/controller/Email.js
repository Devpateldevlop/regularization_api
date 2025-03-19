require("dotenv").config();
const nodemailer = require("nodemailer");
const EmailPost =async (req, res) => {
    try {
        const { senderEmail, senderFeedback,senderName } = req.body;

        if (!senderEmail || !senderFeedback || !senderName) {
            return res.status(400).send("Sender email and feedback are required");
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: 'devpatel190703@gmail.com',
                pass: 'kxcszpwbopestogz',
            },
        });
    
       
        const info = await transporter.sendMail({
          from: `"HRMate" <devpatel190703@gmail.com>`,
          to: senderEmail,
          subject: "Testing!",
          text: `Dear ${senderName},\n\nThank you for taking the time to explore my HRMate and share your valuable insights. Your feedback is not just appreciated – it’s invaluable, as it inspires me to strive for even greater heights.\n\nI’m truly grateful for your support and look forward to staying connected.\n\n If you’d like to revisit my portfolio or see updates, feel free to check it out.\n\nBest regards,\nHRMate`,
          html: `
              <p>Dear ${senderName},</p>
              <p>Thank you for taking the time to explore my HRMate and share your valuable insights. Your feedback is not just appreciated – it’s invaluable, as it inspires me to strive for even greater heights.</p>
              <p>I’m truly grateful for your support and look forward to staying connected.<br><br> If you’d like to revisit my portfolio or see updates, feel free to check it out."</p>
              <p>Best regards,<br>HRMate</p>
          `,
      });
        res.status(200).json({Message:"Thank-you email successfully sent"});
    } catch (error) {
        res.status(500).send("Failed to send thank-you email",error);
    }
};
const ReplyEmail=async (req,res)=>{
    try{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'devpatel190703@gmail.com',
            pass: 'kxcszpwbopestogz',
        },
    });
    const infos = await transporter.sendMail({
        from: `"HRMate" <devpatel190703@gmail.com>`,
        to: 'devpatel190703@gmail.com',
        subject: `Feedback by ${senderName}`,
        text: `Dear HRMate Support,\n Date:${date}\n Name: ${senderName}\n Email:${senderEmail}\n Message:${senderFeedback}\n\nBest regards,\nAhmed Shaikh`
        ,   html: `
            <p>Dear Ahmed Sir,</p>
            <p style='background-color:red'>Date :${formattedDate}</p>
            <p>Name :${senderName}</p>
            <p>Email :${senderEmail}</p>
            <p>Message :${senderFeedback}</p><br>
            <p>Best regards,<br>Ahmed Shaikh</p>
        `,
    });
    res.status(200).json({Message:"Thank-you email successfully sent"});
} catch (error) {
    res.status(500).send("Failed to send thank-you email",error);
}
}
module.exports={
    EmailPost,
    ReplyEmail
}