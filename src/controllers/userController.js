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
    console.log('>>>check req:', req)
    console.log('>>>check id: ', id)
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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}
