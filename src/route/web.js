import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'


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

    router.get('/allcode', userController.getAllCode)





    return app.use("/", router)
}

module.exports = initWebRoutes;