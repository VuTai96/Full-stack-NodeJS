import clinicService from '../services/clinicService'

let createClinic = async (req, res) => {
    try {
        let response = await clinicService.createClinic(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log('createClinic error: ', error)
        return res.status(200).json({
            errCode: -1,
            message: 'createClinic error from server'
        })
    }
}
const getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinic()
        return res.status(200).json(response)
    } catch (error) {
        console.log('getAllClinic error: ', error)
        return res.status(200).json({
            errCode: -1,
            message: 'getAllClinic error from server'
        })
    }
}
const getDetialClinicById = async (req, res) => {
    try {
        let response = await clinicService.getDetialClinicById(req.query.id)
        return res.status(200).json(response)
    } catch (error) {
        console.log('getDetialClinicById error: ', error)
        return res.status(200).json({
            errCode: -1,
            message: 'getDetialClinicById error from server'
        })
    }
}
module.exports = {
    createClinic,
    getAllClinic,
    getDetialClinicById
}