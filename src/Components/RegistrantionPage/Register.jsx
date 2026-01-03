import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loginForm, setloginForm] = useState({
    userID: "",
    password: "",
  });

  const [activeform, setactiveform] = useState("register");

  const [showPassword, setshowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   try{

    setLoading(true)

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify(formData)

    });
    console.log(response);
    
    if(!response.ok){
      throw new Error("Registration Failed")
    }
    
    alert("Registration Successful")

      setformData({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
  }

    catch(error){
      alert(error.message)
    } 
    // finally{
    //   setLoading(false)
    // }

    
  };

  const loginChange = (e) => {
    console.log(e.target.name, e.target.value);

    const { name, value } = e.target;

    setloginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
  try {
  const res = await fetch("http://localhost:3000/users");
  
  if(!res.ok){
    throw new Error("Server Error");
  }

  const users = await res.json();

  const user = users.find((u) =>
   (u.name === loginForm.userID && u.password === loginForm.password))
  
  if(user){
    alert("Loggedin Successfully");
    sessionStorage.setItem(
   "loggedInUser",
    JSON.stringify({
    name: user.name   
  })
);
    navigate("/clientForm")
  }else{
    alert("Invalid User");
  }

   setloginForm({
      userID: "",
      password: "", 
    });

  } catch(error){
    alert(error.message)
  }
 };

  return (
    <>
      {activeform === "register" && (
        <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="heading">
            <button
              onClick={() => {
                setactiveform("login");
              }}
              className="btn1"
            >
              Login
            </button>
          </div>
          <div>
            <label>Name : </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email : </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Mobile No : </label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Your Mobile No"
              required
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="pass-Word">
            <div>
              <label>Password : </label>
              <input
                type={showRegisterPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
            >
              {showRegisterPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <button className="register-btn">Register</button>
        </form>
      )}
      {activeform === "login" && (
        <form className="login-form"
          onSubmit={(e) => {
            loginSubmit(e);
          }}
        >
          <button
            onClick={() => {
              setactiveform("register");
            }}
            className="btn2"
          >
            Register
          </button>  
          <div>
            <label>Enter UserID: </label>
            <input
              type="text"
              name="userID"
              placeholder="Enter Your UserName"
              value={loginForm.userID}
              onChange={loginChange}
            />
          </div>

          <div className="pass-Word">
            <div>
              <label>Enter Password: </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                required
                value={loginForm.password}
                onChange={loginChange}
              />
            </div>
            <button
              type="button"
              className="eye-btn"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          <button className="register-btn">Login</button>
        </form>
      )}
    </>
  );
}
