const db = require("../models")

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address ||
                !data.imageBase64 || !data.descriptionHTML ||
                !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const [user, created] = await db.Clinic.findOrCreate({
                    where: { name: data.name },
                    defaults: {
                        name: data.email,
                        address: data.address,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown
                    },
                });
                if (!created) {
                    await db.Specialty.update({
                        name: data.email,
                        address: data.address,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown
                    },
                        {
                            where: { name: data.name }
                        }
                    );
                    resolve({
                        errCode: 0,
                        errMessage: 'Update Specialty is success!',
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'Create Specialty is success!',
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
const getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Clinic.findAll()
            if (response) {
                response.map((item, index) => {
                    let uint8Array = new Uint8Array(item.image)
                    let deco = new TextDecoder().decode(uint8Array)
                    response[index].image = deco
                })
                resolve({
                    errCode: 0,
                    errMessage: 'getAllClinic is success!',
                    data: response
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'getAllClinic is error!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const getDetialClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let response = {}
                let resClinic = await db.Clinic.findOne({
                    where: { id: id }
                })
                if (resClinic) {
                    let resDoctorInfor = {}
                    resDoctorInfor = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: id,
                        }
                    })
                    response = { resClinic, resDoctorInfor }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'getDetialClinicById is success!',
                    data: response
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createClinic,
    getAllClinic,
    getDetialClinicById
}