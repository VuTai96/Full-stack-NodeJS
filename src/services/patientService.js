import db from '../models/index'
require('dotenv').config();
import emailService from './emailService'

const patientBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'https://www.youtube.com/watch?v=MzPBbDao4Yw'
                })

                //upset patient
                const [user, created] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });
                //create a booking record
                if (user) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user.id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'findOrCreate patient done!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    patientBookAppointment
}