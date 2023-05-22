import React, { useContext, useEffect, useState } from "react";
import "./register.css";
import "../../App.scss";
import { Link, useNavigate } from "react-router-dom";
import video from "../../LoginAssets/library-846.mp4";
import logo from "../../LoginAssets/logo.png";
import {FaUserShield } from "react-icons/fa"
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import createUser from "../../services/createUser";
import { GlobalContext } from "../context/globalContext";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(GlobalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);

    try {
      const data = await createUser(formData);
      alert("Se ha creado su usuario correctamente");
      navigate("/");
      // console.log("god", data);
      // localStorage.setItem("email", data.email);
    } catch (error) {
      alert("Ha ocurrido un error, por favor intente nuevamente");
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Forward!</h2>
            <p></p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Have an account?</span>
            <Link to={"/"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="" />
            <h3>Let us know you!</h3>
          </div>

          <form className="form grid" onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <AiOutlineMail className="icon" />
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
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon"/>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  value={formData.username}
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
              <span>Register</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
