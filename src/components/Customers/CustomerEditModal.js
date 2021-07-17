import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormItem from './FormItem'

const CustomerEditModal = (props) => {

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
            Customer Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4 style={{textAlign:'center'}}>Update Customer Details</h4>
            <FormItem formik={formik} buttonName="save changes" inline={false}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    )
}

export default CustomerEditModal
