const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require('uuid');

// บันทึกข้อมูล
exports.create = async (req, res) => {
    const { title, content, author } = req.body;
    let slug = slugify(title, { lower: true, strict: true });

    if(!slug)slug = uuidv4();

    // ตรวจสอบความถูกต้องค่าว่าง
    if (!title) {
        return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
    }
    if (!content) {
        return res.status(400).json({ error: "กรุณาป้อนบทความ" });
    }

    try {
        const blog = await Blogs.create({ title, content, author, slug });
        return res.status(201).json(blog);
    } catch (err) {
        if (err.code === 11000) { // รหัสข้อผิดพลาดคีย์ซ้ำของ Mongoose
            return res.status(400).json({ error: "มีข้อมูลบทความซ้ำกัน" });
        }
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกบทความ" });
    }
};

// ดึงข้อมูล
exports.getAllblogs = async (req, res) => {
    try {
        const blogs = await Blogs.find({}).exec();
        return res.json(blogs);
    } catch (err) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ" });
    }
};

//ดึงบทความที่คนสนใจตามslug
exports.singleBlog = async (req, res) => {
    const { slug } = req.params;
    try {
        const blog = await Blogs.findOne({ slug }).exec();
        if (!blog) {
            return res.status(404).json({ error: "ไม่พบบทความที่ต้องการ" });
        }
        return res.json(blog);
    } catch (err) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ" });
    }
};

//ลบข้อมูล
exports.remove = async (req, res) => {
    const { slug } = req.params;
    try {
        const blog = await Blogs.findOneAndDelete({ slug }).exec();
        if (!blog) {
            return res.status(404).json({ error: "ไม่พบบทความที่ต้องการลบ" });
        }
        return res.json({ message: "ลบบทความเรียบร้อย" });
    } catch (err) {
        console.error("Error deleting blog:", err); // เพิ่มการแสดงผล error ใน console
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบบทความ" });
    }
};

exports.update = async (req, res) => {
    const { slug } = req.params;
    const { title, content, author } = req.body;

    // ตรวจสอบความถูกต้องค่าว่าง
    // if (!title) {
    //     return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
    // }
    // if (!content) {
    //     return res.status(400).json({ error: "กรุณาป้อนบทความ" });
    // }

    try {
        const blog = await Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec();
        if (!blog) {
            return res.status(404).json({ error: "ไม่พบบทความที่ต้องการอัปเดต" });
        }
        return res.json(blog);
    } catch (err) {
        console.error("Error updating blog:", err); // เพิ่มการแสดงผล error ใน console
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตบทความ" });
    }
};