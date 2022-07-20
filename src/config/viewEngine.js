import express from "express";

let configViewEngine = (app) => {
    //cấu hình đường link public mà client có thể chọc vào
    app.use(express.static("./src/public"));

    //giúp nodejs có thể hiểu được sử dụng view engine có tên ejs
    app.set("view engine", "ejs"); // <=> jsp-java, blade-PHP

    //set đường linh của view engin -> các gile ejs chỉ có thể được viết trong thư mục này
    app.set("views", "./src/views")
}
module.exports = configViewEngine;