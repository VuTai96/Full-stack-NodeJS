import userService from '../services/userService'

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter'
        })
    }
    //check email exist
    //compare password
    //access_token:JWT (json web token)
    let data = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        user: data.user
    })
}
const handleGetAllUser = async (req, res) => {
    let id = req.query.id; //ALL or id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
            user: []
        })
    }
    let user = await userService.getAllUser(id)
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        user: user
    })
}

const handleCreatNewUser = async (req, res) => {
    let newdata = req.body
    if (!newdata.email) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
        })
    }
    let check = await userService.checkExistUser(newdata)
    if (!check) {
        await userService.createNewUser(newdata)
        return res.status(200).json({
            errCode: 0,
            message: `OK`,
        })
    }
    return res.status(200).json({
        errCode: 2,
        message: `User's existed, plz try new user`,
    })
}

const handleDeleteUser = async (req, res) => {
    let message = await userService.deleteUser(req.body)
    return res.status(200).json(message)
}

const handleEditUser = async (req, res) => {
    let message = await userService.editUser(req.body)
    return res.status(200).json(message)
}

const getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)

    } catch (e) {
        console.log('getAllcode have error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreatNewUser: handleCreatNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,

    getAllCode: getAllCode,

}
