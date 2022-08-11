import db from '../models/index'
import _ from 'lodash'
require('dotenv').config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

const getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: 'R2'
                },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllDoctorsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                doctors: doctors || []
            })
        } catch (error) {
            reject(error)
        }
    })
}
const createInforDoctor = (infor) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(infor)
            if (!infor.doctorId || !infor.contentHTML || !infor.contentMarkdown ||
                !infor.selectedPrice || !infor.selectedPayment || !infor.selectedProvince ||
                !infor.nameClinic || !infor.addressClinic || !infor.note) {

                resolve({
                    errCode: 1,
                    message: 'Missing parameter!'
                })
            } else {
                //Markdown
                let resMarkdown = await db.Markdown.findOne({
                    where: { doctorId: infor.doctorId }
                })
                if (resMarkdown) {
                    await db.Markdown.update({
                        contentHTML: infor.contentHTML,
                        contentMarkdown: infor.contentMarkdown,
                        description: infor.description,
                    },
                        {
                            where: {
                                doctorId: infor.doctorId
                            }
                        })
                } else {
                    await db.Markdown.create({
                        contentHTML: infor.contentHTML,
                        contentMarkdown: infor.contentMarkdown,
                        description: infor.description,
                        doctorId: infor.doctorId
                    })
                }

                //Doctor_infor
                let resDoctorInfor = await db.Doctor_Infor.findOne({
                    where: { doctorId: infor.doctorId }
                })
                if (resDoctorInfor) {
                    await db.Doctor_Infor.update({
                        priceId: infor.selectedPrice,
                        provinceId: infor.selectedProvince,
                        paymentId: infor.selectedPayment,
                        addressClinic: infor.addressClinic,
                        nameClinic: infor.nameClinic,
                        note: infor.note
                    },
                        {
                            where: {
                                doctorId: infor.doctorId
                            }
                        })
                } else {
                    await db.Doctor_Infor.create({
                        doctorId: infor.doctorId,
                        priceId: infor.selectedPrice,
                        provinceId: infor.selectedProvince,
                        paymentId: infor.selectedPayment,
                        addressClinic: infor.addressClinic,
                        nameClinic: infor.nameClinic,
                        note: infor.note
                    })
                }
                resolve({
                    errCode: 0,
                    message: 'post infor doctor done!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
const getDetailDoctorService = async (reqQuery) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (reqQuery.id) {
                let response = await db.User.findOne({
                    where: {
                        id: reqQuery.id
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        { model: db.Markdown },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },

                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['doctorId', 'createdAt', 'updatedAt', 'id']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },
                    ],
                    raw: true, //ko có raw = true --> ko get dc data mặc dù đã thêm ở file config
                    nest: true
                })
                let uint8Array = new Uint8Array(response.image)
                let deco = new TextDecoder().decode(uint8Array)
                response.image = deco
                resolve({
                    errCode: 0,
                    data: response || {}
                })
                return
            }
            resolve({
                errCode: 1,
                message: 'Missing parameter!'
            })

        } catch (error) {
            reject(error)
        }
    })
}
const updateInforDoctor = (infor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (infor.doctorId && infor.contentHTML && infor.contentMarkdown &&
                infor.selectedPrice && infor.selectedPayment && infor.selectedProvince &&
                infor.nameClinic && infor.addressClinic && infor.note) {
                let response = await db.Markdown.findOne({
                    where: { doctorId: infor.doctorId }
                })
                if (response) {

                }
                await db.Markdown.update({
                    contentHTML: infor.contentHTML,
                    contentMarkdown: infor.contentMarkdown,
                    description: infor.description,
                    doctorId: infor.doctorId
                },
                    {
                        where: {
                            doctorId: infor.doctorId
                        }
                    })
                resolve({
                    errCode: 0,
                    message: 'update infor doctor done!'
                })
                return
            }
            resolve({
                errCode: 1,
                message: 'Missing parameter!'
            })

        } catch (error) {
            reject(error)
        }
    })

}
const bulkCreateSchedule = (reqBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!reqBody.schedule) {
                resolve({
                    errCode: 1,
                    message: 'bulkCreateSchedule missing require param !'
                })
            } else {
                let schedule = reqBody.schedule
                if (schedule?.length > 0 && schedule[0].date) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                    //console.log('schedule', schedule)
                    //findAll for check existing
                    let existing = await db.Schedule.findAll({
                        where: { doctorId: schedule[0].doctorId, date: (new Date(schedule[0].date)).getTime() },
                        attributes: ['doctorId', 'date', 'timeType', 'maxNumber']
                    })
                    //format existing
                    existing = existing.map(item => {
                        item.date = +item.date
                        return item
                    })
                    //console.log('existing', existing)
                    //take different item of schedule and existing
                    let diff = _.differenceWith(schedule, existing, (a, b) => {
                        return a.date === b.date && a.timeType === b.timeType
                    })
                    //console.log('diff', diff)
                    //create diff into database
                    if (diff?.length > 0) {
                        await db.Schedule.bulkCreate(diff)
                    }
                    resolve({
                        errCode: 0,
                        message: 'bulkCreateSchedule success'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'bulkCreateSchedule missing require param !'
                    })
                }
            }


        } catch (error) {
            reject(error)
        }
    })
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'getScheduleDoctorByDate missing parameter'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: { doctorId, date },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                })
                dataSchedule ? dataSchedule : []
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctorsService: getAllDoctorsService,
    createInforDoctor: createInforDoctor,
    getDetailDoctorService: getDetailDoctorService,
    updateInforDoctor: updateInforDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate
}