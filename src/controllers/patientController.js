import patientService from '../services/patientService'

const patientBookAppointment = async (req, res) => {
    try {
        let response = await patientService.patientBookAppointment(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log('patientBookAppointment error: ', error)
        return res.status(200).json({
            errCode: -1,
            message: 'patientBookAppointment error from server'
        })
    }
}
const postVerifyBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postVerifyBookAppointment(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log('postVerifyBookAppointment error: ', error)
        return res.status(200).json({
            errCode: -1,
            message: 'postVerifyBookAppointment error from server'
        })
    }
}
module.exports = {
    patientBookAppointment,
    postVerifyBookAppointment
}