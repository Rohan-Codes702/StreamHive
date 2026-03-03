import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs";

dotenv.config();

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteOnCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) return null;

        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });

        return result;
    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };

