import express from "express"
import cors from "cors"
import multer from "multer"
import {v4 as uuidv4} from "uuid"
import path from "path"
import fs from "fs"
import {exec} from "child_process"
import { stderr, stdout } from "process"

const app = express()

//multer middleware
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },

    filename: function(req,file,cb){
        //error,filename-userid-extension is same as the tone that is given
        cb(null,file.fieldname + "-" + uuidv4() + path.extname(file.originalname))

    }
})

//multer config
const upload  = multer({storage:storage})

//
app.use(
    cors({
        origin:"*",
        credentials:true
    })
)


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")

    next()
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static("uploads"))



//
app.get('/',function(req,res){
    res.json({message:"Hello Charmi here"})
})

app.post('/upload',upload.single('file'),function(req,res){
    const lessonId = uuidv4()
    const videoPath = req.file.path;
    const outputPath = `./uploads/art/${lessonId}`
    const hlsPath = `${outputPath}/index.m3u8`

    console.log("hlspath",hlsPath)

    if(!fs.existsSync(outputPath)){
        //if repeated video path or not 
        fs.mkdirSync(outputPath,{recursive: true})
    }
    
    //ffmpeg
    const ffmpegCommand = `ffmpeg -report -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

    //no queue
    exec(ffmpegCommand,(err,stdout,stderr)=>{
        if(err){
            console.log(`exec error: ${err}`);
        }

        console.log(`stdout:${stdout}`)
        console.log(`stdout:${stderr}`)

        const videoUrl = `http://localhost:8000/uploads/art/${lessonId}/index.m3u8`;

        res.json({
            message:"Video converted to hls format",
            videoUrl : videoUrl,
            lessonId: lessonId
        })
    })



})


app.listen(8000,function(){
    console.log("app listening at 3000");
})



