import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { asyncLoginUser } from '../../actions/authActions'
import '../../styles/authStyles/login.css'

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
        <div className="diagonal-split-background home-page-main-container">
            <div className="login-left-container">
                    <h3>Don't have an account?</h3>
                    <p>Own a small business? Or planning to start one?</p>
                    <p>Register to get started!</p>
                    <Button style={{maxWidth:'fit-content'}} variant="outline-light"><Link style={{textDecoration:'none', color:'#fff'}} to="/register">Register here</Link></Button>
            </div>
            <div className="login-right-container">
                <h1>Login</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus!</p>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <Form.Control type="email" name="email" placeholder="enter the email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.email && formik.errors.email ? <Form.Text>{formik.errors.email}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" name="password" placeholder="enter the password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.password && formik.errors.password ? <Form.Text>{formik.errors.password}</Form.Text>: null }  
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login