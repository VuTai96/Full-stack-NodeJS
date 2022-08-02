import doctorService from '../services/doctorService';

const getTopDoctorHome = async (req, res) => {
    let limit = 10;
    if (req.query?.limit) {
        limit = req.query.limit
    }
    console.log(limit)
    try {
        let doctors = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}