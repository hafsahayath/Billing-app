import React from 'react'
import { Table, Button } from 'react-bootstrap'

const BillTable = ({bills, findCustomer, customers, handleInvoice, handleDelete}) => {

    const tableStyle = {
        padding:'10px',
        paddingTop:'30px',
        backgroundColor:'white',
        width:'90vw',
        minHeight:'80vh',
        marginLeft:'10px',
        boxShadow: '0 5px 5px -5px #888888'
    }

    const dateFormatter = (date) =>{
       return date.split('T')[0]
    }
    // const date = "2021-07-21T00:00:00.000Z"
    // console.log(new Date())

    return (
        <div style={tableStyle}>
            <Table striped bordered hover className="text-center" size="sm">
                <thead>
                    <tr>
                        <th>SlNo</th>
                        <th>Date</th>
                        <th>Customer(Name)</th>
                        <th>Customer(Mobile)</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((ele,i)=>{
                        return (
                            <tr key={ele._id}>
                                <td>{i+1}</td>
                                <td>{dateFormatter(ele.date)}</td>
                                <td>{findCustomer(ele.customer, customers).name}</td>
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
