import React, { useState } from 'react'
import { Hint } from 'react-autocomplete-hint'
import { useSelector } from 'react-redux'
import ProductInfo from './ProductInfo'

const BillSubContainer = (props) => {
    const customers = useSelector(state=>state.customers)
    const [mobile, setMobile] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    // const [lineItem, setLineItem] = useState([])

    const date = new Date().toISOString().split('T')[0]  //date format yyyy-mm-dd
    const mobileNumbers = customers.map(ele=>ele.mobile)

    const handleAutoFill = (e) => {
        const mobileNumber = e.target.value
        if(mobileNumber){
            const customer = customers.find(ele=>ele.mobile===mobileNumber)
            setId(customer._id)
            setName(customer.name)
        }
    }

    return (
        <div>
            <div>
                <label>Date</label> &nbsp;
                <input type="text" defaultValue={date} disabled={true} /> <br />
            </div>
            <Hint options={mobileNumbers}>
                <input type="text" value={mobile} placeholder="Bill to" onBlur={handleAutoFill} onFocus={()=>setName()} onChange={(e)=>setMobile(e.target.value)} /> 
            </Hint>
            <div>
                <label>Name</label>
                <input type="text" defaultValue={name} disabled={true}/>
            </div>
            <ProductInfo />
        </div>
    )
}

export default BillSubContainer
