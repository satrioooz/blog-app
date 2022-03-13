import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Footer from './Footer/Footer';
// REACT ROUTER
import { Link, useNavigate } from "react-router-dom";
// ========================================

// REACT TYPING
import ReactTypingEffect from 'react-typing-effect';
// ========================================


import Banner from './Banner';
// EDITOR
import MDEditor from '@uiw/react-md-editor';
// ========================================

import './home.css';
import {useDispatch, useSelector} from 'react-redux';
import { deleteDataBlog, setDataBlog , setForm} from '../Reducer/Action/CreateRedux';
// CSS
import './home.css';
// IMAGE
// import Banner from '../images/banner.jpg';
// ========================================
import swal from '@sweetalert/with-react';
// ========================================
// COOKIES

import Cookies from 'js-cookie';
// ========================================
// BOOTSTRAP
import {Card,Col} from 'react-bootstrap'
// ========================================
// ANT DESIGN
import { Avatar ,Skeleton} from 'antd';


const Home = () => {
  const [id, setId] = useState(null)
  const [isUpdate, setIsUpdate] = useState(null)
  const navigate = useNavigate();
  const [editData, setEditData] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch();
  const form = useSelector(state => state.form)
  const [loading, setLoading] = useState(false)

  const dataBlog = useSelector(state => state.dataBlog)
  
  const [show, setShow] = useState(true);

  const handleDelete = (id) => {
    
    axios.delete(`http://localhost:4001/post/${id}`)
    .then((res) => {
      swal(
        <div>
          <h1 className='text-danger'>Terhapus!</h1>
          <p>
            Data Berhasil Terhapus!...
          </p>
        </div>
      )
      dispatch(deleteDataBlog(id))
      dataApi()
    })
    .catch(err => console.log(err))
  }


  const handleEdit = (e) => {
    e.preventDefault()
    let id =e.target.value
    navigate(`create/${id}`)
    
  }

  
// GET API
  const dataApi = () => {
    dispatch(setDataBlog())
    setLoading(true)
   
  }


  useEffect(() => {
        dataApi()
  },[])
  
 


  return (
    <div className='body'>
      <div className="banner">
      <ReactTypingEffect
      style={{fontSize:'3.2rem',color:'white',fontWeight:'bold'}}

        text={["Classic Blog"]}
        cursorRenderer={cursor => <h1> {cursor}</h1>}
      />
      <p >Featured blog post</p>
      </div>
      <div className="container">
      <div className="row align-items-start" style={{overflowX:'hiddden'}}>
   
    
        {dataBlog.map((item,index) => (
      <Card style={{width:'17rem', padding:'0', margin:'10px', height:'68vh'}}>
      <div className='col'>
        <div style={{width:'100%', height:'30vh', overflow:'hidden'}}>
        <img  style={{width:'100%',margin:'auto'}} src={`http://localhost:4001/${item.image}`} />
        </div>
        {/* <Skeleton loading={loading}> */}
  <Card.Body>
    <Card.Title >{item.title}</Card.Title>
    <div>
    <MDEditor.Markdown source={item.body?.substring(0,20) + '...'} value={item.body} />
    </div>
  </Card.Body > 
  <div className='d-flex' style={{justifyContent:'center',width:'100%'}}>
  <button onClick={() => navigate(`detail/${item._id}`)} style={{padding:'5px 30px', margin:' auto'}} className='btn btn-info'>Show Detail</button>
    </div>
  <br/>
  <div className='d-flex' style={{justifyContent:'center',width:'100%'}}>
  {Cookies.get('token') !== undefined ?

  <button className='btn btn-danger ' style={{margin:'0 15px', padding:'5px 25px'}} value={item._id} onClick={() => handleDelete(item._id)}>Delete</button>
  : null }
  <span style={{margin:'0 5px'}}>|</span>
  {Cookies.get('token') !== undefined ?
  <button className='btn btn-primary' style={{margin:'0 15px', padding:'5px 25px'}} value={item._id} onClick={handleEdit}>Edit</button> : null
  }
      </div>
      <p style={{ padding:'0 10px'}}>Created by <span style={{color:'red'}}>{item.username}</span></p>
      {/* <p style={{ padding:' 10px'}}> {item.createdAt}</p> */}
        {/* <p>{item.createdAt[5] === '3' ? 'Maret' : null  
      }</p> */}

      </div>
</Card>
        ))}

      </div>
      </div>
      <Footer/>
     </div>
  )
}

export default Home;