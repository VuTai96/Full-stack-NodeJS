require('dotenv').config()
import nodemailer from "nodemailer"

const setHTMLToSend = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên bookingcare</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu thông tin trên là đúng sự thật, vui lòng nhấn vào đường link bên dưới để 
        xác nhận và hoàn tất thủ tục
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank"> click here</a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on bookingcare</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time: ${dataSend.time}</b>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above information is true, please click on the link below to confirm and complete the procedure
    </p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank"> click here</a>
    </div>
    <div>thanks and best regards!</div>
    `
    }
    return result
}
const sendSimpleEmail = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"BabyShark 👻" <vutai13196@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body
        html: setHTMLToSend(dataSend)
    });

}
module.exports = {
    sendSimpleEmail
}
