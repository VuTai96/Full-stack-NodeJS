
const getHomePage = (req, res) => {
    return res.render('homePage.ejs')
}
const getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}