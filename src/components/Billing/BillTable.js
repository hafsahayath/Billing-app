import React from 'react'
import { Table, Button } from 'react-bootstrap'

const BillTable = ({bills, dateFormatter, findCustomer, customers, handleInvoice, handleDelete}) => {
    return (
        <div style={{width:'100vw', paddingTop:'50px'}}>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th>SlNo</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((ele,i)=>{
                        return (
                            <tr key={ele._id}>
                                <td>{i+1}</td>
                                <td>{dateFormatter(ele.date)}</td>
                                <td>{findCustomer(ele.customer, customers).mobile}</td>
                                <td>{ele.total}</td>
                                <td style={{textAlign:'center'}}><a href="#" onClick={()=>handleInvoice(ele)}> invoice</a>&nbsp;<Button onClick={()=>handleDelete(ele._id)}>delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>            
        </div>
    )
}

export default BillTable
