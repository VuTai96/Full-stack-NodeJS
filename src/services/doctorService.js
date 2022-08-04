import db from '../models/index'

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

            if (infor.doctorId && infor.contentHTML && infor.contentMarkdown) {
                console.log('vao db')
                await db.Markdown.create({
                    contentHTML: infor.contentHTML,
                    contentMarkdown: infor.contentMarkdown,
                    description: infor.description,
                    doctorId: infor.doctorId
                })
                resolve({
                    errCode: 0,
                    message: 'post infor doctor done!'
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
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctorsService: getAllDoctorsService,
    createInforDoctor: createInforDoctor
}