import React from "react";
import { Link,useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import logo from './logo.jpeg';
import {Avatar} from 'antd';


const Navbar = () => {

  const navigate = useNavigate();

  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light text-light " style={{backgroundColor:'#3B3B3A'}}>
        <div className="container">
        <Link to="/" className="navbar-brand text-light">
          {/* <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/> */}
          Logo
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link text-light">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link text-light">
              Create Post
            </Link>
          </li>
          {Cookies.get('email') !== undefined ? 
          <div >
          <li className="nav-item text-light">
            <Link
             onClick={() => {
              Cookies.remove('email')
              Cookies.remove('username')
              Cookies.remove('token')
              Cookies.remove('image')
              navigate('/login')
            }} to="" className="nav-link text-light">
              Logout
            </Link> 
            </li>
            </div>
            :
            <li className="nav-item text-light">
            <Link  to="/login" className="nav-link text-light">
              Login
            </Link>
            </li>
          }
            {Cookies.get('username') !== undefined ?
              <li className="nav-item d-flex align-items-center" >
             <Avatar 
             className='rounded-circle'
             style={{height:'35px',margin:'auto',width:'35px'}}
             src={`http://localhost:4001/${Cookies.get('image')}`}/>
            </li>
             : null
            }
         
          
        </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
