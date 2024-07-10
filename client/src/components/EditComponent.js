import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getToken } from "../service/authorize";

const EditComponent=(props)=>{
    const [state, setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title,author, slug} = state
    const [content,setContent] = useState('')

    const submitContent = (event)=>{
        setContent(event)
    }

//ดึงบทความที่ต้องการเเก้ไข
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`, )
        .then(response=>{
            const { title, content, author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
            console.log(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line 
    },[])

    const showUpdateForm = () => {
        return (
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")} />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill
                    value={content}
                    onChange={submitContent}
                    theme="snow"
                    className="pb-5 mb-3"
                    style={{border:'1px solid #666'}}
                   />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
                </div>
                <br />
                <input type="submit" value="อัพเดท" className="btn btn-primary" />
            </form>
        );
    };

    
    //กำำหนดค่าให้ state
    const inputValue = name=>event=>{
        // console.log(name,"=", event.target.value)
        setState({...state,[name]:event.target.value});
    }

    //http://localhost:5500/api/blog/slug=> put
    const submitForm =(e)=>{
        e.preventDefault();
        console.log("API URL =", process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`, {title, content, author},
        {
            headers:{
              authorization:`Bearer ${getToken()}`
            }
          }
        )
        .then(response=>{
            // alert("บันทึกเรียบร้อย");
            Swal.fire({
                title: "แจ้งเตือน!",
                text: "อัพเดทค่าเรียบร้อย!",
                icon: "success"
               });
               const {title,content,author,slug} = response.data
               setState({...state,title,content,author,slug})
               setContent(content)
        })
        .catch(err=>{
            alert(err);
            
        })
    }
    return (
        <div className="container p-5">
        <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            {showUpdateForm()}
        </div>
    );
}

export default EditComponent;