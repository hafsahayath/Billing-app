import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { asyncRegisterUser } from '../../actions/authActions'

const Register = (props) => {
    const isRegistered = useSelector(state=>state.auth.register)
    
    useEffect(()=>{
        if(isRegistered){
            props.history.push('/')
        }
    },[isRegistered])

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            businessName:'',
            address:''
        },
        validationSchema:Yup.object({
            username:Yup.string()
                .required('username is required')
                .max(15, 'must be 15 characters or less'),
            email:Yup.string()
                .email('invalid email address')
                .required('email is required'),
            password:Yup.string()
                .min(6, 'password must be atleast 6 characters')
                .required('password is required'),
            businessName:Yup.string()
                .required('business name is required'),
            address:Yup.string()
                .required('business address is required')
        }),
        onSubmit:values=>{
            console.log(values)
            dispatch(asyncRegisterUser(values))
        }
    })

    return (
        <div>
            <h1>Sign up for an Account</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus!</p>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="username" placeholder="enter the username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange}/> <br />
                    {formik.touched.username && formik.errors.username ? <small>{formik.errors.username}</small> : null} 
                </div>
                <div>
                    <input type="email" name="email" placeholder="enter the email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.email && formik.errors.email ? <small>{formik.errors.email}</small> : null}
                </div>
                <div>
                    <input type="password" name="password" placeholder="enter the password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.password && formik.errors.password ? <small>{formik.errors.password}</small>: null }  
                </div>
                <div>
                    <input type="text" name="businessName" placeholder="enter your business name" value={formik.values.businessName} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.businessName && formik.errors.businessName ? <small>{formik.errors.businessName}</small> : null} 
                </div>
                <div>
                    <input type="text" name="address" placeholder="enter the address" value={formik.values.address} onBlur={formik.handleBlur} onChange={formik.handleChange} /> <br />
                    {formik.touched.address && formik.errors.address ? <small>{formik.errors.address}</small> : null} 
                </div>
                <button type="submit">Sign up</button>
            </form>
            <h2>Already signed up?</h2>
            <Link to="/">Login</Link>
        </div>
    )
}

export default Register
