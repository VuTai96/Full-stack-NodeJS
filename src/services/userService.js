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
                let isPasswordTrue = await bcrypt.compareSync(password, user.password);
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

module.exports = {
    handleUserLogin: handleUserLogin
}