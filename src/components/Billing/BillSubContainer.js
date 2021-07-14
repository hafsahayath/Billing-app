import React, { useState } from 'react'
import { Hint } from 'react-autocomplete-hint'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BillProducts from './BillProducts'
import { asyncCreateBill } from '../../actions/billActions'
import InvoicePopUp from './InvoicePopUp'


const BillSubContainer = (props) => {
    const customers = useSelector(state=>state.customers)
    const [mobile, setMobile] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [lineItems, setLineItems] = useState([])
    const [displayBillData, setDisplayBillData] = useState({})
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch()

    const date = new Date().toISOString().split('T')[0]  //date format yyyy-mm-dd
    const mobileNumbers = customers.map(ele=>ele.mobile)

    const handleAutoFill = (e) => {
        const mobileNumber = e.target.value
        const customer = customers.find(ele=>ele.mobile===mobileNumber)
        if(customer){
            setId(customer._id)
            setName(customer.name)
        }
    }

    const addLineItem = (allLineItems) => {
        setLineItems(allLineItems)
    }

    const handleSubmit = () => {
        const billData = {
            date: date,
            customer: id,
            lineItems: lineItems
        }
        if(billData.customer){
            dispatch(asyncCreateBill(billData))
            setDisplayBillData(billData)
            setModalShow(true)
        } else {
            alert('empty fields')
        }
    }

    return (
        <div>
            <Link to="/listing-bills">View bills</Link>
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
            <BillProducts addLineItem={addLineItem} />
            <button onClick={handleSubmit}>Create</button>

            <InvoicePopUp
            {...displayBillData}
            show={modalShow}
            onHide={() => setModalShow(false)}
            />

        </div>
    )
}

export default BillSubContainer