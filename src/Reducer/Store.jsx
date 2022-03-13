import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    dataBlog: [],
    cout:1,
    getId: null,
    form: {
        title: '',
        body:''
    },
}

const rootReducer = (state = initialState, action) => {
    if(action.type === 'ADD_BLOG'){
        return {
            ...state,
            dataBlog: [...state.dataBlog, action.payload]
        }
    }
    if(action.type === 'GET_DATA_BLOG'){
        return {
            ...state,
            dataBlog: action.payload
        }
    }
    if(action.type === 'DELETE_BLOG') {
       return{
              ...state,
                dataBlog: state.dataBlog.filter(item => item.id !== action.payload)
       }
    }
   
    // buatkan sebuah action type yang mengupdate data ke server
    if(action.type === 'UPDATE_DATA_BLOG') {
        return {
            ...state,
            dataBlog: state.dataBlog.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                }
                return item
            }
            )
        }
    }
    
    return state;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;