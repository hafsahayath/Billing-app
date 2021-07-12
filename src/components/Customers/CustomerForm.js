import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { asyncAddCustomer } from '../../actions/customerActions'
import FormItem from './FormItem'

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
            resetForm({values:''})
        }
    })

    return (
        <div>
            <h1>Add a customer</h1>
            <FormItem formik={formik} buttonName="Add"/>
        </div>
    )
}

export default CustomerForm
