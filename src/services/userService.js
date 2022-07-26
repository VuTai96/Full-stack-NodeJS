import db from "../models/index"
import bcrypt from 'bcryptjs'


const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            const user = await db.User.findOne({
                attributes: ['email', 'roleId', 'password'],
                where: { email: email },
                raw: true
            })
            if (user) {
                let isPasswordTrue = bcrypt.compareSync(password, user.password);
                if (isPasswordTrue) {
                    delete user.password
                    data.errCode = 0;
                    data.message = 'Ok'
                    data.user = user
                } else {
                    data.errCode = 3;
                    data.message = 'Wrong password'
                    data.user = {}
                }
            } else {
                data.errCode = 3;
                data.message = 'User is not found'
                data.user = {}
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
const getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let dataUser = '';
        try {
            if (userId.toLowerCase() === "all") {
                dataUser = await db.User.findAll({
                    attributes: { exclude: ['password'] }
                })
            }
            if (userId && userId.toLowerCase() !== "all") {
                dataUser = await db.User.findOne({
                    attributes: { exclude: ['password'] },
                    where: { id: userId }
                })
                dataUser = dataUser ? dataUser : []
            }
            resolve(dataUser)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser

}