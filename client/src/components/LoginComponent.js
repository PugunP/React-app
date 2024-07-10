import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../service/authorize";
import { withRouter } from "react-router-dom";

const LoginComponent = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((response) => {
        //login สำเร็จ
        authenticate(response, () => props.history.push("/create"));
        // console.log(response)
      })
      .catch((err) => {
        Swal.fire({
          title: "แจ้งเตือน!",
          text: err.response.data.error,
          icon: "error",
        });
      });
    console.table({ username, password });
  };
  useEffect(() => {
    getUser() && props.history.push("/");
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เข้าสู่ระบบ | Admin</h1>
      {JSON.stringify(state)}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          ></input>
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          ></input>
        </div>
        <br />
        <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
        <a className="btn btn-success" href="/">
          หน้าเเรก
        </a>
      </form>
    </div>
  );
};

export default withRouter(LoginComponent);
