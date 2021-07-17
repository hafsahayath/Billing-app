import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { asyncLoginUser } from '../../actions/authActions'
import { isEmpty } from 'lodash'
import '../../styles/authStyles/login.css'

const Login = (props) => {
    const [serverErrors, setServerErrors ] = useState({})
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
        const handleServerErrors = (errs) => {
            setServerErrors(errs)
        }
        dispatch(asyncLoginUser(values, handleServerErrors))
        }
    })

    return (
        <div className="home-page-main-container">
            { !isEmpty(serverErrors) && serverErrors.errors }           
            <div className="login-left-container">
                    <h4>Don't have an account?</h4>
                    <p>Own a small business? Or planning to start one?</p>
                    <p>Register to get started!</p>
                    <Link className="register-button" style={{textDecoration:'none', color:'white',textAlign:"center"}} to="/register">Register here</Link>
            </div>
            <div className="login-right-container">
                <h1>Login</h1>
                <p>Login for instant access to your business data</p>
                <Form className="login-form-control" onSubmit={formik.handleSubmit}>
                    <Form.Group className="form-fields">
                        <Form.Control type="email" name="email" placeholder="enter the email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.email && formik.errors.email ? <Form.Text className="error-text">{formik.errors.email}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group className="form-fields">
                        <Form.Control type="password" name="password" placeholder="enter the password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.password && formik.errors.password ? <Form.Text className="error-text">{formik.errors.password}</Form.Text>: null }  
                    </Form.Group>
                    <Button className="login-button" variant="primary" type="submit">Login</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login