//ชื่อบทความ (tittle), เนื้อหาบทความ (content), ผู้เขียน (author), slug(url)
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:{},
        require:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true, //บังคับภาษาเป็นตัวเล็ก
        unique:true //ทำให้ไม่ซ้ำ
    }
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)