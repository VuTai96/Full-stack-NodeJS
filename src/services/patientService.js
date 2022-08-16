import db from '../models/index'
require('dotenv').config();
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';

const buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.POST_URL}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}
uuidv4();

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
                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
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
                            timeType: data.timeType,
                            token: token
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

const postVerifyBookAppointment = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succees!',
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist!',
                    })
                }


            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    patientBookAppointment,
    postVerifyBookAppointment
}