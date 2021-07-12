import axios from 'axios'

export const asyncAddProduct = (productData) => {
    return  (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/products', productData, {
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(addProduct(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncGetProducts = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/products',{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(getProducts(result))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(deleteProduct(result._id))
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const asyncEditProduct = (id, updatedProductData) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, updatedProductData, {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            } else {
                dispatch(updateProduct(result))
            }
        })
    }
}

const updateProduct = (responseData) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: responseData
    }
}

const deleteProduct = (id) => {
    return {
        type: 'DELETE PRODUCT',
        payload: id
    }
}

const getProducts = (allProducts) => {
    return {
        type: 'ALL_PRODUCTS',
        payload: allProducts
    }
}

const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}