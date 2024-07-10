const express = require("express");
const router = express.Router();
const { create, getAllblogs, singleBlog, remove, update } = require("../controllers/blogcontroller"); 
const {requireLogin} = require("../controllers/authController")

router.get('/blog/:slug', singleBlog);
router.get('/blogs', getAllblogs);
//การเรียกใช้งาน requireLogin เพื่อตรวจ token
router.post('/create',requireLogin, create);
router.delete('/blog/:slug',requireLogin, remove);
router.put('/blog/:slug',requireLogin, update);

module.exports = router;
