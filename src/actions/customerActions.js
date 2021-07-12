import axios from "axios"

export const asyncAddCustomer = (customerData) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', customerData, {
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            console.log(result)
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            } else {
                dispatch(addCustomer(result))
            }
        })
    }
}

export const asyncGetCustomers = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/customers', {
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(getCustomers(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncEditCustomer = (id, updatedCustomerData) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, updatedCustomerData, {
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            } else {
                dispatch(editCustomer(result))
            }
        })
    }
}

export const asyncDeleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(deleteCustomer(result._id))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

const deleteCustomer = (id) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: id
    }
}

const editCustomer = (updatedData) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: updatedData
    }
}

const getCustomers = (customerData) => {
    return {
        type: 'GET_CUSTOMERS',
        payload: customerData
    }
}

const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    } 
}