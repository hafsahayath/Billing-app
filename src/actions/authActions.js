import axios from "axios";

export const asyncRegisterUser = (formData) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formData)
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                } else {
                    alert('registered successfully')
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
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                } else {
                    alert('logged in successfully')
                    localStorage.setItem('token', result.token)
                    dispatch(loginUser())
                }
            })
            .catch((err)=>{
                alert(err.message)
            })
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
