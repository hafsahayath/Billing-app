import { Modal, Button } from 'react-bootstrap'
import FormItem from './FormItem';

function ProductEditModal(props) {
    const { formik } = props
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <h4 style={{textAlign:'center',paddingBottom:'10px'}}>Update Product Details</h4>
          <FormItem formik={formik} buttonName="save" inline={false}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  export default ProductEditModal