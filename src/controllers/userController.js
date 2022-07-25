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

module.exports = {
    handleLogin: handleLogin
}
