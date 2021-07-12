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
        <Modal.Body>
          <h4>Update Product Details</h4>
          <FormItem formik={formik} buttonName="save changes"/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ProductEditModal