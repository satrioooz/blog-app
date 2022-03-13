import React, { useState, createElement,useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLoading, Bars } from '@agney/react-loading';
import MDEditor from '@uiw/react-md-editor';
import {AddComent} from '../Reducer/Action/CreateRedux';
import { useDispatch } from "react-redux";
import moment from 'moment';
import Footer from './Footer/Footer';
import rehypeSanitize from "rehype-sanitize";


// COOKIES
import Cookies from 'js-cookie';

// ========================================
// ANT DESIGN
import { CommentOutlined,DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons';
import { Comment, Avatar,Tooltip, Form, Button, List, Input } from 'antd';

const Example = () => {
  const dispatch = useDispatch();

  const { TextArea } = Input;
    // STATE
    // COMENT START
    const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  // COMENT END
    const [database, setDatabase] = useState([])
    const [commentar, setComment] = useState('')
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" />,
      });
      const [loading,setLoading ] = useState(true)
    // ====
    const { id } = useParams()

    const getDataById = () => {
      axios.get('http://localhost:4001/post/' + id)
      .then((res) => {
          const resp = res.data
          setLoading(false)
          setDatabase(resp.data)
          // console.log(resp)
          let data = resp.data.comment[0]
          console.log(resp.comment)
      })
      .catch(err => console.log(err))
    }

    useEffect(() => {
      getDataById()

    },[])

    // COMENTAR
    const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
    };
  
    const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
    };
  

    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];
  // COMENTAR ENDS

    const handleChange = (e) => {
      const {name, value} = e.target
      setComment(value)
  
      console.log('comment', commentar)
      console.log(id)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const data = {
        username: Cookies.get('username'),
        commentar: commentar,
      }
      console.log(data)
      
      
      axios.post('http://localhost:4001/coment/' + id, data)
      .then((res) => {
        getDataById()
        console.log('BERHASIL !')
      }
      )
      .catch(err => console.log('err', err))
    }


    const load = loading === true ?
    <div style={{margin:'auto 0',width:'100%'}} >
              <section  {...containerProps}>
    {indicatorEl}
  </section> 
    </div>
 :
   <div className="container" style={{height:'110vh'}}>
     <div className="row py-1" style={{height:'85vh',overflow:'hidden',objectFit:'cover'}}>
          <img className="img-fluid" src={`http://localhost:4001/${database.image}`} alt=""/>
          </div>
   <h1 style={{textAlign:'center'}}>{database.title}</h1>
   <MDEditor.Markdown
    rehypePlugins={[[rehypeSanitize]]}
    source={database.body} />
          <p>{database.createdAt?.substring(0,10)}</p>
         
   
  </div>


  return (
    <div >
        {load}
        <Footer/>
    </div>
  )
}

export default Example