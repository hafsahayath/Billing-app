import React from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../styles/productStyles/productFormItem.css'

const FormItem = ({formik, buttonName, inline}) => {
    return (
        <div>
            <Form className={inline? "product-inline-form":"product-form-column"} onSubmit={formik.handleSubmit}>
                <Form.Group className="product-form-groups">
                    <Form.Control className="px-5" type="name" name="name" placeholder="enter name of the product" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.name && formik.errors.name ? <Form.Text className="error-text">{formik.errors.name}</Form.Text> : null}
                </Form.Group>
                <Form.Group className="product-form-groups">
                    <Form.Control className="px-5" type="number" name="price" placeholder="enter the price" value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.price && formik.errors.price ? <Form.Text className="error-text">{formik.errors.price}</Form.Text>: null }  
                </Form.Group>
                <Form.Group className="product-form-groups">
                    <Button className="px-5" type="submit">{buttonName}</Button>
                </Form.Group>
            </Form>            
        </div>
    )
}

export default FormItem