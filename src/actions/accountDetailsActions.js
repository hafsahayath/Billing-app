import axios from "../config/axiosConfig"

export const asyncGetAccDetails = () => {
    return (dispatch) =>  {
        axios.get('/users/account')
        .then((response)=>{
            const result = response.data
            dispatch(getAccDetails(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

const getAccDetails = (userDetails) => {
    return {
        type: 'USER_DETAILS',
        payload: userDetails
    }
}