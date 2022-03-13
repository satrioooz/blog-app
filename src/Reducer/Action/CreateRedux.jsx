import axios from 'axios';
import Cookies from "js-cookie";


export const updateBlog = (payload) => {
    return {
        type: 'UPDATE_DATA_BLOG',
        payload
    }
}

export const AddComent = (payload) => {
    return  (dispatch) => {
        const data = {
            username: Cookies.get('username'),
            comment: payload.comment
        }
        let id = window.location.pathname.split('/')[2]
        axios.post(`http://localhost:4001/comment/${id}`, data)
        .then(res => {
            dispatch(updateBlog(res.data))
            // console.log('BERHASILL!!!!')
        })
        .catch(err => console.log(err))
    }
}


export const setAddBlog = (payload) => {
    return (dispatch) => {
        let username = Cookies.get('username')
        const data = new FormData()
        data.append('title', payload.title)
        data.append('username', username)
        data.append('body', payload.body)
        data.append('image', payload.images)
        axios.post('http://localhost:4001/post', data)
  
    .then((res) =>{
        const response = res.data
        dispatch({
            type: 'ADD_BLOG',
            payload: response.data
    })
})
    .catch((err) => {
        console.log(err)
    })

}
}


export const setDataBlog = () => {
    return (dispatch) => {
        axios.get('http://localhost:4001/posts')
    .then((res) => {
    //   console.log(res.data)
      const response = res.data
      dispatch({type: 'GET_DATA_BLOG', payload:response.data})
      
    })
    .catch((err) => {
      console.log('error', err)
    })
    }
}

export const deleteDataBlog = (id) => {
    return ({type: 'DELETE_BLOG', payload: id})
    }

