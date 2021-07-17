import axios from "../config/axiosConfig"

export const asyncAddCustomer = (customerData) => {
    return (dispatch) => {
        axios.post('/customers', customerData)
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
        axios.get('/customers')
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
        axios.put(`/customers/${id}`, updatedCustomerData)
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
        axios.delete(`/customers/${id}`)
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