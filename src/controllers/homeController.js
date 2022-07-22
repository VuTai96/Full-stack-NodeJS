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
    console.log(meseage)
    return res.send('post crud from server ')
}
const displayCRUD = async (req, res) => {
    let dataUsers = await CRUDService.readUsers()
    console.log(dataUsers)
    return res.render('displayCRUD', { dataUsers: dataUsers })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
} 