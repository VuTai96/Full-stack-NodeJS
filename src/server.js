import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
require('dotenv').config(); //giúp chạy process.env.PORT


let app = express();
let port = process.env.PORT || 6969;

//có thể thay bodyParser bằng express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

app.listen(port, () => {
    console.log("Backend NodeJS is running on the port: ", port)
})

