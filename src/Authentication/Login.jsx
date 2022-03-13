import React, { useState } from "react";
import Cookies from "js-cookie"
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
import './login.css';
// import swal from 'sweetalert';
import toast, { Toaster } from 'react-hot-toast';
// ANT DESIGN



const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
      let name = e.target.name
      let value = e.target.value
      setInput({
        ...input, [name]: value
      })
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    let api = 'http://localhost:4001/login'
    // let token = Cookies.set('token')
    let data = {
      email: input.email,
      password: input.password
    }

    axios.post(api, data)
    .then((res) => {
      console.log(res.data)
      const data = res.data.user
      const token = res.data.token
      Cookies.set('token', token,{expires: 1})
      Cookies.set('image', data.image,{expires: 1})
      Cookies.set('email', data.email,{expires: 1})
      Cookies.set('username', data.name,{expires: 1})
      console.log('berhasil')
      navigate('/')
      // toast.success('Login Berhasil')
    })
    .catch(( err ) => {
      console.log(err)
        toast.error('Akun Tidak Ditemukan')
    })
  }
 

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h1 style={{ textAlign: "center" }}>Login Account</h1>
    <div className="top">
      <form onSubmit={handleSubmit}  id="login-form" className="login-form"  role="main">
  <h1 className="a11y-hidden">Login Form</h1>
  <div>
    <label className="label-email">
      <input onChange={handleChange} value={input.email} type="email" className="text" name="email" placeholder="Email"  />
      <span className="required">Email</span>
    </label>
  </div>
  <input type="checkbox" value={input.password} onChange={handleChange} name="show-password" className="show-password a11y-hidden" id="show-password"  />
  <label className="label-show-password" for="show-password">
    <span>Show Password</span>
  </label>
  <div>
    <label className="label-password">
      <input type="text" value={input.password} onChange={handleChange} className="text" name="password" placeholder="Password" />
      <span className="required">Password</span>
    </label>
  </div>
  <input type="submit" value="Log In" />
  <div className="email">
    {/* <Link to="/register">Daftar Akun?</Link> */}
  </div>
  <figure aria-hidden="true">
    <div className="person-body"></div>
    <div className="neck skin"></div>
    <div className="head skin">
      <div className="eyes"></div>
      <div className="mouth"></div>
    </div>
    <div className="hair"></div>
    <div className="ears"></div>
    <div className="shirt-1"></div>
    <div className="shirt-2"></div>
  </figure>
</form>
</div>
    </>
  );
};

export default Login;
