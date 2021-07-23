import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { asyncAddCustomer } from '../../actions/customerActions'
import FormItem from './FormItem'
import '../../styles/customerStyles/customerForm.css'
import { swal } from '../../selectors/alert'

const CustomerForm = (props) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            name:'',
            mobile:'',
            email:''
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
        onSubmit:(values, {resetForm})=>{
            dispatch(asyncAddCustomer(values))
            swal('customer added!')
            resetForm({values:''})
        }
    })

    return (
        <div className="customer-container">
            <div style={{backgroundColor:"#4D7DE3"}}>
                <h1 style={{color:"#fff"}}>customers</h1>
            </div>
            <div className="add-customer-container">
                <FormItem formik={formik} buttonName="Add customer" inline={true}/>
            </div>
        </div>
    )
}

export default CustomerForm
