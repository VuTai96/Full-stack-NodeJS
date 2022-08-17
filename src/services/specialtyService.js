const db = require("../models")

const creatSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const [user, created] = await db.Specialty.findOrCreate({
                    where: { name: data.name },
                    defaults: {
                        name: data.email,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown
                    },
                });
                if (!created) {
                    await db.Specialty.update({
                        name: data.email,
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
const getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Specialty.findAll()
            if (response) {
                response.map((item, index) => {
                    let uint8Array = new Uint8Array(item.image)
                    let deco = new TextDecoder().decode(uint8Array)
                    response[index].image = deco
                })
                resolve({
                    errCode: 0,
                    errMessage: 'getAllSpecialty is success!',
                    data: response
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'getAllSpecialty is error!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    creatSpecialty,
    getAllSpecialty
}