import axios from "../config/axiosConfig"

export const asyncCreateBill = (billData) => {
    return (dispatch) => {
        axios.post('/bills', billData)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else {
                dispatch(createBill(result))
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncGetBills = () => {
    return (dispatch) => {
        axios.get('/bills')
        .then((response)=>{
            const result = response.data
            dispatch(getBills(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncDeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`/bills/${id}`,{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(deleteBill(result._id))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

const deleteBill = (id) => {
    return {
        type: 'DELETE_BILL',
        payload: id
    }
}

const getBills = (bills) => {
    return {
        type: 'ALL_BILLS',
        payload: bills
    }
}

const createBill = (bill) => {
    return {
        type: 'CREATE_BILL',
        payload: bill
    }
}