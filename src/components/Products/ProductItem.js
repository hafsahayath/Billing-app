import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import ProductEditModal from './ProductEditModal'
import { asyncDeleteProduct, asyncEditProduct } from '../../actions/productActions'
import { swal } from '../../selectors/alert'

const ProductItem = ({_id:id, name, price, i, editToggle, resetSearch}) => {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()

    const handleEdit = () => {
        setModalShow(true)
        editToggle()
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(asyncDeleteProduct(id))
                swal('successfully deleted')
            }
          })  
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
            swal('Saved changes!')
            resetSearch()
            setModalShow(false)
        }
    })

    return (
        <>
            <tr>
                <td>{i+1}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td style={{textAlign:'center'}}><Button variant="primary" onClick={handleEdit}>edit</Button>&nbsp;<Button variant="danger" onClick={handleDelete}>delete</Button></td>
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