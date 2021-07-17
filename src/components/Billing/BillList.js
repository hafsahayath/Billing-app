import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetBills, asyncDeleteBill } from '../../actions/billActions'
import InvoicePopUp from './InvoicePopUp'
import BillTable from './BillTable'

const BillList = (props) => {
    const bills = useSelector(state=>state.bills)
    const customers = useSelector(state=>state.customers)
    const [modalShow, setModalShow] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({})

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetBills())
    },[])

    const findCustomer = (id, array) => {
        const item = array.find(ele=>{
            return ele._id === id
        })
        return item ? {...item} : {} 
    }

    const dateFormatter = (date) => {
        return date.slice(0,10).split('-').reverse().join('-')
    }

    const handleDelete = (id) => {
        dispatch(asyncDeleteBill(id))
    }

    const handleInvoice = (ele) => {
        const invoiceData = {
            lineItems: ele.lineItems.map(item=>{
                return {product:item.product, quantity:item.quantity}
            }),
            customer: ele.customer,
            date: dateFormatter(ele.date)
        }
        setCustomerDetails(invoiceData)
        setModalShow(true)
    }

    return (
        <div>
            <h2 className="mx-2">Manage your bills</h2>
            {bills.length > 0 ? (
                <>
                    <BillTable 
                        bills={bills} 
                        findCustomer={findCustomer} 
                        customers={customers} 
                        dateFormatter={dateFormatter} 
                        handleInvoice={handleInvoice} 
                        handleDelete={handleDelete} 
                    />
                    <InvoicePopUp
                        customer={customerDetails.customer}
                        date={customerDetails.date}
                        lineItems={customerDetails.lineItems}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> 
                </>
            ):(
                <div style={{paddingTop:'100px',paddingLeft:'500px'}}>
                    <h2>No bills found</h2>
                </div>
            )}

        </div>
    )
}

export default BillList