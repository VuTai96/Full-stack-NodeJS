import db from "../models"


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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}