import axios from 'axios'

export const asyncGetAccDetails = () => {
    return (dispatch) =>  {
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account', {
            headers:{
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
        })
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