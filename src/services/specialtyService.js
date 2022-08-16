const db = require("../models")

const creatSpecialty = (data) => {
    console.log(data)
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
                        descriptionHTML: data.decriptionHTML,
                        descriptionMarkdown: data.decriptionMarkdown
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
module.exports = {
    creatSpecialty
}