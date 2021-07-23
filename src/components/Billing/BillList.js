import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetBills, asyncDeleteBill } from '../../actions/billActions'
import InvoicePopUp from './InvoicePopUp'
import BillTable from './BillTable'
import Swal from 'sweetalert2'
import { swal } from '../../selectors/alert'

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

    const dateFormatter = (date) =>{
        return date.split('T')[0]
     }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(asyncDeleteBill(id))
                swal('successfully deleted')
            }
          })   
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
            <div style={{backgroundColor:"#4D7DE3", color:"#fff"}}>
                <h2 className="mx-2 py-2">Manage your bills</h2>
            </div>
            {bills.length > 0 ? (
                <>
                    <BillTable 
                        bills={bills} 
                        findCustomer={findCustomer} 
                        customers={customers} 
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