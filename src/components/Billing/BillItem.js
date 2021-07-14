import React,{useState, ReactFragment} from 'react'
import InvoicePopUp from './InvoicePopUp'

const BillItem = ({_id:id, date:date, customer, total, lineItems, customers, i, dateFormatter, handleDelete, findCustomer}) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <tr key={id}>
                <td>{i+1}</td>
                <td>{dateFormatter(date)}</td>
                <td>{findCustomer(customer, customers).name}</td>
                <td>{total}</td>
                <td><a href="#" onClick={()=>setModalShow(true)}>generate invoice</a></td>
                <td><button onClick={()=>handleDelete(id)}>delete</button></td>
            </tr>

            <InvoicePopUp
            customer={customer}
            date={dateFormatter(date)}
            lineItems={lineItems}
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
    </>
    )
}

export default BillItem
