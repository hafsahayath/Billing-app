import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://dct-billing-app.herokuapp.com/api'
})

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default axios