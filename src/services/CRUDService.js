import db from '../models/index';
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

const creatNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber
            })
            resolve('>>> Created new user is done!')

        } catch (error) {
            reject(error)
        }
    })
}
const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}
const readUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let datauUser = await db.User.findAll({
                raw: true //để lấy mỗi file mảng rows
            })
            resolve(datauUser)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    creatNewUser: creatNewUser,
    readUsers: readUsers
}