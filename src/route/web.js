import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patinetControler from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)// chưa sử dụng dc put chưa sử dụng dc put
    router.get('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreatNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllCode)

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.put('/api/update-infor-doctor', doctorController.updateInforDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    router.post('/api/patient-book-appointment', patinetControler.patientBookAppointment)
    router.post('/api/verify-book-appointment', patinetControler.postVerifyBookAppointment)

    router.post('/api/creat-new-specialty', specialtyController.creatSpecialty)
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetialSpecialtyById)





    return app.use("/", router)
}

module.exports = initWebRoutes;