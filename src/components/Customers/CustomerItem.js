import React, { useState } from 'react'
import CustomerEditModal from './CustomerEditModal';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { asyncEditCustomer, asyncDeleteCustomer } from '../../actions/customerActions'
import { swal } from '../../selectors/alert';

const CustomerItem = ({_id:id, name, mobile, email, i, toggleStatus}) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()

    const handleEdit = () =>{
        setModalShow(true)
        toggleStatus()
    }

    const btnStyle={
        background: 'none',
        border: 'none',
        color:'#d9534f'
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
                dispatch(asyncDeleteCustomer(id))
                swal('successfully deleted')
            }
          })       
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
            swal('successfully updated changes')
            setModalShow(false)
        }
    })

    return (
        <>
            <tr key={id}>
                <td>{i+1}</td>
                <td>{name}</td>
                <td>{mobile}</td>
                <td>{email}</td>
                <td colSpan="2" style={{textAlign:'center'}}><button style={{border:'none', background:'transparent',color:'#0275d8'}} onClick={handleEdit}><i class="fas fa-user-edit"></i></button>&nbsp;<button style={btnStyle} onClick={handleDelete}><i class="fas fa-user-minus"></i></button></td>
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
