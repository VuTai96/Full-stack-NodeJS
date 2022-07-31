import db from "../models/index"
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10);
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
const checkExistUser = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let isExistUser = false;
            let user = await db.User.findOne({
                where: { email: data.email }
            })
            if (user) {
                isExistUser = true
            }
            resolve(isExistUser)
        } catch (error) {
            reject(error)
        }
    })
}
const checkExistUserById = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let isExistUser = false;
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                isExistUser = true
            }
            resolve(isExistUser)
        } catch (error) {
            reject(error)
        }
    })
}

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            const user = await db.User.findOne({
                attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
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
const createNewUser = (data) => {
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
const deleteUser = (data) => {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        try {
            const code = {};
            if (!data?.id) {
                code.errCode = 1
                code.message = 'Missing parameter'
                resolve(code)
                return;
            }
            let isExistUser = await checkExistUserById(data)
            if (!isExistUser) {
                code.errCode = 2
                code.message = `UserId = ${data.id} is not exist, plz try another id`
                resolve(code)
                return;
            }
            await db.User.destroy({
                where: { id: data.id }
            })
            code.errCode = 0
            code.message = `Done! Deleted userId: ${data.id}!`
            resolve(code)
        } catch (error) {
            reject(error)
        }
    })
}
const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const code = {};
            console.log('check data: ', data, 'check id', data.id)
            if (!data?.id) {
                code.errCode = 1
                code.message = 'Missing parameter'
                resolve(code)
                return;
            }
            let isExistUser = await checkExistUserById(data)
            if (!isExistUser) {
                code.errCode = 2
                code.message = `UserId = ${data.id} is not exist, plz try another id`
                resolve(code)
                return;
            }
            await db.User.update({
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address
            }, {
                where: {
                    id: data.id
                }
            });
            code.errCode = 0
            code.message = `Done! Updated userId: ${data.id}!`
            resolve(code)
        } catch (error) {
            reject(error)
        }
    })
}
const getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing params'
                })
            } else {
                let response = await db.Allcode.findAll({
                    where: { type: type }
                })
                resolve({
                    errCode: 0,
                    data: response
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    checkExistUser: checkExistUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeService: getAllCodeService
}