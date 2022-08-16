require('dotenv').config()
import nodemailer from "nodemailer"


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
        html: `
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
        <div>Xin chân thành cảm ơn</div>
        `
        , // html body
    });

}
module.exports = {
    sendSimpleEmail
}
