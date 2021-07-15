import React from 'react'

const BillTable = ({bills, dateFormatter, findCustomer, customers, handleInvoice, handleDelete}) => {
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
                            <tr key={ele._id}>
                                <td>{i+1}</td>
                                <td>{dateFormatter(ele.date)}</td>
                                <td>{findCustomer(ele.customer, customers).mobile}</td>
                                <td>{ele.total}</td>
                                <td><a href="#" onClick={()=>handleInvoice(ele)}> invoice</a></td>
                                <td><button onClick={()=>handleDelete(ele._id)}>delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>            
        </div>
    )
}

export default BillTable