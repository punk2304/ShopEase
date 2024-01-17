const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
        })
    }catch (error) {
		console.log(error);
	}
}

async function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function upoloadFileToCloudinary(file, folder){
    const options = {folder};
    console.log("temp files path", file.tempFilepath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try{
        const name = req.body;
        console.log("name", name);
        const file = req.files.file;
        console.log("file", file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        const response = await upoloadFileToCloudinary(file, "profilePhoto");
        console.log("response", response);

        const photoURL = response.secure_url;
        console.log("photoURL", photoURL);

        res.json({
            success: true,
            message: "file successfully uploaded",
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong",
        })
    }
}