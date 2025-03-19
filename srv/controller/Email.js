require("dotenv").config();
const nodemailer = require("nodemailer");
const EmailPost =async (req, res) => {
    try {
        const { employeecode,lastName,firstName,EmailNotificationTo, FromDate,FromDateDayType,LeaveType,Remarks,ToDateDayType ,ToDate} = req.body;

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
       
        var AdminEmail = EmailNotificationTo.replace("|",",");
        const info = await transporter.sendMail({
            from: `"HRMate" <devpatel190703@gmail.com>`,
            to: AdminEmail,
            subject: "🔔 New Leave Request Submitted",
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 8px; padding: 20px; background-color: #ffffff; border: 1px solid #ddd;">
         <h2 style="color: #1E3A8A; text-align: center;">🚀 New Leave Request</h2> <p style="font-size: 14px; color: #333;">Dear Admin,</p>
          <p style="font-size: 14px; color: #333;">An employee has submitted a leave request. Please find the details below:</p>
           
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px; border: 1px solid #333;">
          <tr style="background-color: #1E3A8A; color: #ffffff; font-weight: bold; text-align: left;">
          <th style="padding: 12px; border: 1px solid #333;">Field</th>
          <th style="padding: 12px; border: 1px solid #333;">Details</th>
          </tr>
          <tr style="background-color: #ffffff;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">Employee Code</td>
          <td style="padding: 10px; border: 1px solid #333;">${employeecode}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">First Name</td>
          <td style="padding: 10px; border: 1px solid #333;">${firstName}</td>
          </tr>
          <tr style="background-color: #ffffff;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">Last Name</td>
          <td style="padding: 10px; border: 1px solid #333;">${lastName}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">Leave Type</td>
          <td style="padding: 10px; border: 1px solid #333;">${LeaveType}</td>
          </tr>
          <tr style="background-color: #ffffff;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">From Date</td>
          <td style="padding: 10px; border: 1px solid #333;">${FromDate} (${FromDateDayType})</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">To Date</td>
          <td style="padding: 10px; border: 1px solid #333;">${ToDate} (${ToDateDayType})</td>
          </tr>
          <tr style="background-color: #ffffff;">
          <td style="padding: 10px; border: 1px solid #333; font-weight: bold;">Remarks</td>
          <td style="padding: 10px; border: 1px solid #333;">${Remarks || "N/A"}</td>
          </tr>
          </table>
           
              <p style="margin-top: 20px; font-size: 14px; color: #333;">Please review and take the necessary action.</p>
          <p style="font-size: 14px; color: #333;">Best regards,<br><strong>HRMate System</strong></p>
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