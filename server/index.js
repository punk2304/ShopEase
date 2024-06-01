const express = require("express");
const app = express();
const cors = require('cors');


require('dotenv').config();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true,
  }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

require("./config/database").connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//route import and mount
const user = require("./routes/Auth");
const product=require("./routes/Product")
const categories=require("./routes/Categories")
const profile=require("./routes/Profile")
const order=require("./routes/Order")

app.use("/api/v1", user);
app.use("/api/v1",product)
app.use("/api/v1",categories)
app.use("/api/v1",profile)
app.use("/api/v1",order)

//actuivate

app.options('*', cors());

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})