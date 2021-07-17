import axios from "../config/axiosConfig";
import { swalAuthAlert } from "../selectors/alert";

export const asyncRegisterUser = (formData) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                } else {
                    swalAuthAlert('registered successfully')
                    dispatch(registerUser())
                }
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}

export const asyncLoginUser = (formData) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                } else {
                    swalAuthAlert('logged in successfully')
                    localStorage.setItem('token', result.token)
                    dispatch(loginUser())
                }
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}

export const resetState = () => {
    return {
        type: 'LOGOUT'
    }
}

export const setLoggedIn = () => {
    return {
        type: 'LOGGED_IN'
    }
}

const loginUser = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

const registerUser = () => {
    return {
        type: 'REGISTER'
    }
}
