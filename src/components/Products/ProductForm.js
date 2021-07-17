import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { asyncAddProduct } from '../../actions/productActions'
import FormItem from './FormItem'
import '../../styles/productStyles/productForm.css'

const ProductForm = (props) => {

    const dispatch = useDispatch()

    const swal = (text) => {  
        let timerInterval;
        Swal.fire({
            title: text,
            timer: 1000,
            timerProgressBar: false,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          })
          .then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
    }

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
            <h1>products</h1>
        <div className="add-product-container">
            <FormItem formik={formik} buttonName="add" inline={true}/>
        </div>
        </div>
    )
}

export default ProductForm