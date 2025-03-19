require("dotenv").config();
const nodemailer = require("nodemailer");
const EmailPost =async (req, res) => {
    try {
        const { employeecode,lastName,firstName,EmailNotificationTo, FromDate,FromDateDayType,LeaveType,Remarks,ToDateDayType } = req.body;

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
       
        var AllEmail = EmailNotificationTo.replace("|",",");
        const info = await transporter.sendMail({
          from: `"HRMate" <devpatel190703@gmail.com>`,
          to: AllEmail,
          subject: "HRMate Leave !",
          text: `Dear HRMate Admin,\n Employee Code:${employeecode}\n First Name:${firstName}\n Last Name: ${lastName}\n Remark:${Remarks}\n Leave Type:${LeaveType}\n From Date:${LeaveType}\n From Date Day Type :${FromDateDayType}\n To Date Day Type :${ToDateDayType}\n\nBest regards,\nAhmed Shaikh`
        ,   html: `
            <p>Dear HRMate User,</p>
            <p style='background-color:red'>Employee Code :${employeecode}</p>
            <p>First Name :${firstName}</p>
            <p>Last Name :${lastName}</p>
            <p>Remark :${Remarks}</p><br>
             <p>Leave Type :${LeaveType}</p>
            <p>From Date :${FromDate}</p><br>
             <p>From Date Day Type :${FromDateDayType}</p>
            <p>To Date Day Type :${ToDateDayType}</p><br>
            <p>Best regards,<br>Ahmed Shaikh</p>
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
        to: "devpatel190703@gmail.com",
        subject: `Feedback by ${senderName}`,
        text: `Dear HRMate Support,\n Date:${date}\n Name: ${senderName}\n Email:${senderEmail}\n Message:${senderFeedback}\n\nBest regards,\nAhmed Shaikh`
        ,   html: `
            <p>Dear User Sir,</p>
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