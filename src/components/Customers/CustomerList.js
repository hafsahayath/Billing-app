import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Table } from 'react-bootstrap'
import { asyncGetCustomers } from '../../actions/customerActions'
import CustomerItem from './CustomerItem'
import '../../styles/customerStyles/customerList.css'

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
        <div className="main-container-list">
            <div className="search-component">
                <Form.Control type="text" value={search} placeholder="search by name or number" onChange={handleSearchChange} />
            </div>
            <div className="table-component">
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
   
                        </tr>
                    </thead>
                    <tbody>
                        {listCustomers.map((ele,i)=>{
                            return <CustomerItem key={ele._id} i={i} {...ele} toggleStatus={toggleStatus}/>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CustomerList
