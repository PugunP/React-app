import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../service/authorize";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  const { title, author } = state;

  const [content, setContent] = useState("");
  //กำำหนดค่าให้ state
  const inputValue = (name) => (event) => {
    // console.log(name,"=", event.target.value)
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) => {
    setContent(event);
  };

  const submitForm = (e) => {
    e.preventDefault();
    // console.table({title, content, author})
    console.log("API URL =", process.env.REACT_APP_API);
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author },
      {
        headers:{
          authorization:`Bearer ${getToken()}`
        }
      }
    )
      .then((response) => {
        // alert("บันทึกเรียบร้อย");
        Swal.fire({
          title: "แจ้งเตือน!",
          text: "บันทึกเรียบร้อย!",
          icon: "success",
        });
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        // alert(err.response.data.error)
        Swal.fire({
          title: "แจ้งเตือน!",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เขียนบทความ</h1>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          ></input>
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="เขียนรายละเอียดบทความ"
            style={{ border: "1px solid #666" }}
          />
        </div>
        <div className="form-group">
          <label>ผู้เเต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          ></input>
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
        <a className="btn btn-success" href="/">
          หน้าเเรก
        </a>
      </form>
    </div>
  );
};

export default FormComponent;
