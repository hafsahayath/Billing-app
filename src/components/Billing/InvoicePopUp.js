import { Modal, Button } from "react-bootstrap";
import { useSelector } from 'react-redux'
// import { findProduct } from "../../selectors/billing";
 
const InvoicePopUp = (props) => {
  const { customer, date, lineItems } = props

  const customers = useSelector(state=>state.customers)
  const products = useSelector(state=>state.products)

  const findCustomer = (id, array) => {
    return array.find(ele=>{
      return ele._id === id
    })
  }

  const findProduct = (id, array) => {
    return array.find(ele=>{
      return ele._id === id
    })
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
        <Modal.Body>
          <div>
            Invoice Date : {date}
          </div>
          <div>
            <h4>Bill To :</h4>
            <p>Customer Name: {customer && findCustomer(customer, customers).name}</p>
            <p>Contact Number: {customer && findCustomer(customer, customers).mobile}</p>
            {customer && findCustomer(customer, customers).email!=='' && <p>Email : {findCustomer(customer, customers).email } </p>}
          </div>
          <table>
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
          <div>
            <label htmlFor="">Grand Total</label>
            <input type="text" defaultValue={total} disabled={true}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button>Print</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default InvoicePopUp