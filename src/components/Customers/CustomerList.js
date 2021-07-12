import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetCustomers } from '../../actions/customerActions'
import CustomerItem from './CustomerItem'

const CustomerList = (props) => {
    const customers = useSelector(state=>state.customers)
    const [status, setStatus] = useState(false)
    const [listCustomers, setListCustomers] = useState([])
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetCustomers())
    },[status])

    useEffect(()=>{
        if(search===''){
            setListCustomers([...customers])
        } else {
            const res = customers.filter(ele=>{
                return ele.name.toLowerCase().includes(search.toLowerCase()) || ele.mobile.includes(search)
            })
            setListCustomers(res)
        }
    },[search, customers])

    const toggleStatus = () => {
        setStatus(!status)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            <input type="text" value={search} placeholder="search by name or number" onChange={handleSearchChange} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listCustomers.map(ele=>{
                        return <CustomerItem key={ele._id} {...ele} toggleStatus={toggleStatus}/>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerList
