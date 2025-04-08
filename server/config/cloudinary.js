import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

const imageStorage=new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"profile_images",
    allowed_formats:['jpg','png','jpeg','svg']
  }
})

const videoStorage= new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:"Campaign_Videos",
    resource_type: "video",
    allowed_formats:['mp4','mov','avi','mkv']
  })
})

const uploadImage=multer({storage:imageStorage}) 
const uploadVideo=multer({storage:videoStorage})

export {cloudinary,uploadImage,uploadVideo};