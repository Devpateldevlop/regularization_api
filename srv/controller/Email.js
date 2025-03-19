require("dotenv").config();
const nodemailer = require("nodemailer");
const EmailPost =async (req, res) => {
    try {
        const { employeecode,lastName,firstName,EmailNotificationTo, FromDate,FromDateDayType,LeaveType,Remarks,ToDateDayType } = req.body;

        if (!EmailNotificationTo || !Remarks || !firstName) {
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
            to: AllEmail, // Replace with the actual admin email
            subject: "🔔 New Leave Request Submitted",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #007bff; text-align: center;">🚀 New Leave Request</h2>
                <p>Dear User,</p>
                <p>An employee has submitted a leave request. Please find the details below:</p>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">Employee Code</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${employeecode}</td>
                  </tr>
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">First Name</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${firstName}</td>
                  </tr>
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">Last Name</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${lastName}</td>
                  </tr>
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">Leave Type</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${LeaveType}</td>
                  </tr>
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">From Date</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${FromDate} (${FromDateDayType})</td>
                  </tr>
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">To Date</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${ToDate} (${ToDateDayType})</td>
                  </tr>
                  <tr>
                    <td style="background-color: #007bff; color: #fff; padding: 8px; font-weight: bold;">Remarks</td>
                    <td style="background-color: #f1f1f1; padding: 8px;">${Remarks || "N/A"}</td>
                  </tr>
                </table>
          
                <p style="margin-top: 20px;">Please review and take necessary action.</p>
                <p>Best regards,<br><strong>HRMate System</strong></p>
              </div>
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