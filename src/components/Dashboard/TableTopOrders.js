import React from 'react'
import { Table } from 'react-bootstrap'
import { dateFormatter } from '../../selectors/billing'
import '../../styles/dashboardStyles/statsContainer.css'

const TableTopOrders = ({bills, customers, text}) => {

    const sortFromHighest = bills.sort((a,b)=>b.total-a.total)
    const findCustomer = (id, array) => {
        const cust = array.find(ele=>{
           return ele._id === id
        })
        return cust? {...cust} : {}
    }

    return (
        <div className="text-center">
            <strong className="my-3">{text}</strong>
            <Table className="mt-1" size="md">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortFromHighest.map((ele,i)=>{
                            return i<5 && (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{findCustomer(ele.customer, customers).name}</td>
                                    <td>{ele.total}</td>
                                    <td>{dateFormatter(ele.createdAt)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TableTopOrders
