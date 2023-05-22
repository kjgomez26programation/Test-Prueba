import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import "../../App.scss";

import { Link, redirect, useNavigate } from "react-router-dom";
// Import-Assets
import video from "../../LoginAssets/library-846.mp4";
import logo from "../../LoginAssets/logo.png";
// import icon
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import loginUser from "../../services/loginService";
import { GlobalContext } from "../context/globalContext";



const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    // console.log(isLoggedIn)
    try {
      const data = await loginUser(formData.email, formData.password);
      // console.log("god", data);
      localStorage.setItem("email", formData.email);
      // console.log(formData);
      setIsLoggedIn(true);
      navigate("/crud");
    } catch (error) {
      console.error(error);
      alert("Usuario o contraseña invalido, por favor verificar");
    }
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    // console.log(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Forward!</h2>
            <p></p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to={"/register"}>
              <button className="btn">Sing Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="" />
            <h3>Welcome</h3>
          </div>

          <form action="" className="form grid" onSubmit={handleSubmit}>
            <span className="showMessage">Login Status</span>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your passaword? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
