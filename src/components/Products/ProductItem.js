import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as Yup from 'yup'
import ProductEditModal from './ProductEditModal'
import { asyncDeleteProduct, asyncEditProduct } from '../../actions/productActions'

const ProductItem = ({_id:id, name, price, editToggle, resetSearch}) => {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()

    const handleEdit = () => {
        setModalShow(true)
        editToggle()
    }

    const handleDelete = () => {
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove){
            dispatch(asyncDeleteProduct(id))
        }
    }

    const formik = useFormik({
        initialValues:{
            name: name ? name : '',
            price: price ? price : ''
        },
        validationSchema:Yup.object({
            name:Yup.string()
                .required('name is required'),
            price:Yup.string()
                .required('price is required')
        }),
        onSubmit:(values)=>{
            dispatch(asyncEditProduct(id, values))
            resetSearch()
            setModalShow(false)
        }
    })

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{price}</td>
                <td><Button variant="primary" onClick={handleEdit}>edit</Button> <Button variant="danger" onClick={handleDelete}>delete</Button></td>
            </tr>

            <ProductEditModal
                show={modalShow}
                formik={formik}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default ProductItem