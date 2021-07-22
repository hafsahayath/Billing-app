import axios from "../config/axiosConfig";
import { swalAuthAlert } from "../selectors/alert";
import { asyncGetAccDetails } from "./accountDetailsActions";
import { asyncGetBills } from "./billActions";
import { asyncGetCustomers } from "./customerActions";
import { asyncGetProducts } from "./productActions";

export const asyncRegisterUser = (formData) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.hasOwnProperty('errmsg')){ // mongo error recheck!!
                    alert(result.errmsg)
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

export const asyncLoginUser = (formData, handleServerErrors) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    // alert(result.errors)
                    handleServerErrors(result)
                } else {
                    swalAuthAlert('logged in successfully')
                    localStorage.setItem('token', result.token)
                    // Promise.all([
                    //     axios.get('/bills'),
                    //     axios.get('/customers'),
                    //     axios.get('/products')
                    // ]).then((values) => {
                    //     const [bills, customers, products] = values 
                    //     dispatch(getBills(bills))
                    // })
                    window.location.reload() // pick up token for axios instance 
                    // dispatch(asyncGetAccDetails())
                    // dispatch(asyncGetBills())
                    // dispatch(asyncGetCustomers())
                    // dispatch(asyncGetProducts())
                    // dispatch(loginUser())
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
