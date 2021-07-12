import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { asyncAddProduct } from '../../actions/productActions'
import FormItem from './FormItem'

const ProductForm = (props) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            name:'',
            price:''
        },
        validationSchema:Yup.object({
            name:Yup.string()
                .required('name is required'),
            price:Yup.string()
                .required('price is required')
        }),
        onSubmit:(values,{resetForm})=>{
            console.log(values)
            dispatch(asyncAddProduct(values))
            resetForm({values:''})
        }
    })


    return (
        <div>
            <h1>Add products</h1>
            <FormItem formik={formik} buttonName="add"/>
        </div>
    )
}

export default ProductForm