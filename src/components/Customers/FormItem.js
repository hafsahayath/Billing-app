import React from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../styles/customerStyles/formItem.css'

const FormItem = ({formik, buttonName, inline}) => {
    return (
        <div>
            <Form className={inline? "form-inline":"form-column"} onSubmit={formik.handleSubmit}>
                <Form.Group className="form-groups">
                    <Form.Label className="form-labels">Name</Form.Label>
                    <div className="col-text">
                        <Form.Control type="text" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.name && formik.errors.name ? <Form.Text className="error-text">{formik.errors.name}</Form.Text> : null}
                    </div>
                </Form.Group>
                <Form.Group className="form-groups">
                    <Form.Label className="form-labels">Mobile</Form.Label>
                    <div className="col-text">
                        <Form.Control type="text" name="mobile" value={formik.values.mobile} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.mobile && formik.errors.mobile ? <Form.Text className="error-text">{formik.errors.mobile}</Form.Text> : null}
                    </div>
                </Form.Group>
                <Form.Group className="form-groups">
                    <Form.Label className="form-labels">Email</Form.Label>
                    <div className="col-text">
                        <Form.Control type="text" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.email && formik.errors.email ? <Form.Text className="error-text">{formik.errors.email}</Form.Text> : null}
                    </div>
                </Form.Group>
                <Button type="submit">{buttonName}</Button>

            </Form>    
        </div>
    )
}

export default FormItem
