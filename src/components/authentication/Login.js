import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoginUser } from '../../actions/authActions'

const Login = (props) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)

    useEffect(()=>{
        if(loggedIn){
            props.history.push('/dashboard')
        }
    },[loggedIn])

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string()
                .email('invalid email address')
                .required('email is required'),
            password:Yup.string()
                .min(6, 'password must be atleast 6 characters')
                .required('password is required')
        }),
        onSubmit:values=>{
            dispatch(asyncLoginUser(values))
        }
    })

    return (
        <div>
            <h1>Login</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus!</p>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="email" name="email" placeholder="enter the email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.email && formik.errors.email ? <small>{formik.errors.email}</small> : null}
                </div>
                <div>
                    <input type="password" name="password" placeholder="enter the password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.password && formik.errors.password ? <small>{formik.errors.password}</small>: null }  
                </div>
                <button type="submit">Login</button>
            </form>
            <h2>Don't have an account?</h2>
            <Link to="/register">Register here</Link>
        </div>
    )
}

export default Login