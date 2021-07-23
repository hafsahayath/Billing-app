import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { asyncAddProduct } from '../../actions/productActions'
import FormItem from './FormItem'
import '../../styles/productStyles/productForm.css'
import { swal } from '../../selectors/alert'

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
            // console.log(values)
            dispatch(asyncAddProduct(values))
            swal('product added to the inventory!')
            resetForm({values:''})
        }
    })


    return (
        <div className="product-container">
            <div style={{backgroundColor:"#4D7DE3", marginBottom:"6px"}}>
                <h1 style={{color:"#fff"}}>products</h1>
            </div>
        <div className="add-product-container">
            <FormItem formik={formik} buttonName="add" inline={true}/>
        </div>
        </div>
    )
}

export default ProductForm