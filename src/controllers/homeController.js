import db from "../models"
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();  // phải là db.User đúng với return trong file user.js
        return res.render('homePage.ejs', { data: JSON.stringify(data) })
    } catch (error) {
        console.log(error)
    }
}
const getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
const getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
const postCRUD = async (req, res) => {
    let meseage = await CRUDService.creatNewUser(req.body)
    //console.log(meseage)
    return res.send('post crud from server ')
}
const displayCRUD = async (req, res) => {
    let dataUsers = await CRUDService.readUsers()
    //console.log(dataUsers)
    return res.render('displayCRUD', { dataUsers: dataUsers })
}
const getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInforByID(userId);
        return res.render('editCrud.ejs', { userData: userData })
    } else {
        return res.send('User not found!')
    }
}
const putCRUD = async (req, res) => {
    let data = req.body
    //console.log('>>> check data', data)
    const dataUsers = await CRUDService.updateUser(data)
    return res.render('displayCRUD.ejs', { dataUsers: dataUsers })
}
const deleteCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        const dataUsers = await CRUDService.deleteUserById(userId)
        //return res.send('deleteUserID')
        return res.render('displayCRUD.ejs', { dataUsers: dataUsers })
    } else {
        return res.send('user not found!')
    }
    //console.log('>>> check data', data)

}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

} 