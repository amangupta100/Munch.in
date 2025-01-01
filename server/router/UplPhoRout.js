const router = require("express").Router()
const multer = require("multer")
const { uploadPhoto } = require("../controllers/Details")

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./upload")
    },
    filename:(req,file,callback)=>{
        callback(null,`${file.originalname}`)
    }
})

const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});

router.post("/upload",upload.single("image"),uploadPhoto)

module.exports = router