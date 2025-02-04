import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })


        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("Failed", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const removeFromCloudinary = async (url) => {
    try {
        if (!url) return null
        const publicId = url.split("/").pop().split(".")[0]
        const response = await cloudinary.uploader.destroy(publicId)
        // console.log(response);
        return response;
    } catch (error) {
        console.log("Error while removing from cloudinary", error?.message);
        return null;
    }
}



export { uploadOnCloudinary, removeFromCloudinary }