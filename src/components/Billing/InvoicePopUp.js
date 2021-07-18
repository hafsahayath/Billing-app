import { Modal, Button } from "react-bootstrap";
import { useSelector } from 'react-redux'
import BillHeader from "./BillHeader";

// import { findProduct } from "../../selectors/billing";
 
const InvoicePopUp = (props) => {
  const { customer, date, lineItems } = props

  const customers = useSelector(state=>state.customers)
  const products = useSelector(state=>state.products)

  const findCustomer = (id, array) => {
    const item = array.find(ele=>{
      return ele._id === id
    })
    return item ? {...item} : {}
  }

  const findProduct = (id, array) => {
    const item = array.find(ele=>{
      return ele._id === id
    })
    return item ? {...item} : {}
  } 

  const total = lineItems && lineItems.map(ele=>{
    return findProduct(ele.product, products).price*ele.quantity
    }).reduce((acc,curr)=>acc+curr,0)

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"0", padding:"0"}}>
          <div className="row m-1">
            <div className="flex-column col-12">
              <BillHeader />
              <div className="mx-4">
                <strong>Bill To :</strong>
                <div className="p-2">
                  <h6>Customer Name: {findCustomer(customer, customers).name}</h6>
                  <h6>Contact Number: {findCustomer(customer, customers).mobile}</h6>
                  {findCustomer(customer, customers).email && <h6>Email : {findCustomer(customer, customers).email } </h6>}
                </div>
              </div>
            </div>
            {/* <div className="col-4">
              Invoice Date : {date}
            </div> */}
          </div>
          <table className="table text-center">
              <thead>
                <tr>
                  <th>SlNo</th>
                  <th>Product Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {lineItems &&
                lineItems.map((ele,i)=>{
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{findProduct(ele.product, products).name}</td>
                      <td>{findProduct(ele.product, products).price}</td>
                      <td>{ele.quantity}</td>
                      <td>{findProduct(ele.product, products).price*ele.quantity}</td>
                    </tr>
                  )
                })}
              </tbody>
          </table>
          <div className="row pt-3 justify-content-end">
            <h5 className="mx-5">Grand Total - <strong><i style={{fontSize:'17px'}} className="fas fa-rupee-sign"></i> {total}</strong></h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <Button className="col-2 m-2">Print</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default InvoicePopUp