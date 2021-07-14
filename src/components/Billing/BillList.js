import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetBills, asyncDeleteBill } from '../../actions/billActions'
import BillItem from './BillItem'

const BillList = (props) => {
    const bills = useSelector(state=>state.bills)
    const customers = useSelector(state=>state.customers)


    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetBills())
    },[])

    const findCustomer = (id, array) => {
        return array.find(ele=>{
            return ele._id === id
        }) 
    }

    const dateFormatter = (date) => {
        return date.slice(0,10).split('-').reverse().join('-')
    }

    const handleDelete = (id) => {
        dispatch(asyncDeleteBill(id))
    }

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>SlNo</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((ele,i)=>{
                        return (
                            <BillItem {...ele} i={i} customers={customers} dateFormatter={dateFormatter} findCustomer={findCustomer} handleDelete={handleDelete}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BillList