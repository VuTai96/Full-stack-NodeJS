import specialtyService from '../services/specialtyService'
const creatSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.creatSpecialty(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log('creatSpecialty error: ', error)
        return res.status(200).json({
            errCode: -1,
            message: 'creatSpecialty error from server'
        })
    }
}
module.exports = {
    creatSpecialty
}