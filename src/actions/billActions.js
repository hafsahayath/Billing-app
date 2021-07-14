import axios from 'axios'

export const asyncCreateBill = (billData) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/bills', billData, {
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        })
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
        axios.get('http://dct-billing-app.herokuapp.com/api/bills', {
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        })
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
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,{
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