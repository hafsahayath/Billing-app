import React, { useState } from 'react'
import CustomerEditModal from './CustomerEditModal';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { asyncEditCustomer, asyncDeleteCustomer } from '../../actions/customerActions'

const CustomerItem = ({_id:id, name, mobile, email, toggleStatus}) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()

    const handleEdit = () =>{
        setModalShow(true)
        toggleStatus()
    }

    const handleDelete = () => {
        const confirmRemove = window.confirm('Are you sure?')
        if(confirmRemove){
            dispatch(asyncDeleteCustomer(id))
        }
    }

    const formik = useFormik({
        initialValues:{
            name:name ? name : '',
            mobile:mobile ? mobile : '',
            email:email ? email : ''
        },
        validationSchema:Yup.object({
            name:Yup.string()
                .required('name is required'),
            mobile:Yup.string()
                .required('mobile is required')
                .min(10, 'mobile number must be 10 characters long'),
            email:Yup.string()
                .email('invalid email address')
        }),
        onSubmit:(values)=>{
            dispatch(asyncEditCustomer(id, values))
            setModalShow(false)
        }
    })

    return (
        <>
            <tr key={id}>
                <td>{name}</td>
                <td>{mobile}</td>
                <td>{email}</td>
                <td><button onClick={handleEdit}>edit</button><button onClick={handleDelete}>delete</button></td>
                <td><button>invoices</button></td>
            </tr>

            <CustomerEditModal
            show={modalShow}
            formik={formik}
            onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default CustomerItem
