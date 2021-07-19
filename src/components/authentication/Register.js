import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { asyncRegisterUser } from '../../actions/authActions'
import '../../styles/authStyles/register.css'

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
            // console.log(values)

            dispatch(asyncRegisterUser(values))
        }
    })

    return (
        <div className="home-page-main-container">

            <div className="signup-left-container">
                <h2>Already signed up?</h2>
                <p>Login for instant access to your business data</p>
                <Link className="login-left-btn" style={{textDecoration:'none', color:'white', textAlign:"center"}} to="/">Login</Link>
            </div>
            <div className="signup-right-container">
                <h1>Sign up for an Account</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus!</p>
                <Form className="signup-form-control" onSubmit={formik.handleSubmit}>
                    <Form.Group className="signup-form-fields">
                        <Form.Control type="text" name="username" placeholder="enter the username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                        {formik.touched.username && formik.errors.username ? <Form.Text className="error-text">{formik.errors.username}</Form.Text> : null} 
                    </Form.Group>
                    <Form.Group className="signup-form-fields">
                        <Form.Control type="email" name="email" placeholder="enter the email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} /> 
                        {formik.touched.email && formik.errors.email ? <Form.Text className="error-text">{formik.errors.email}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group className="signup-form-fields">
                        <Form.Control type="password" name="password" placeholder="enter the password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />  
                        {formik.touched.password && formik.errors.password ? <Form.Text className="error-text">{formik.errors.password}</Form.Text>: null }  
                    </Form.Group>
                    <Form.Group className="signup-form-fields">
                        <Form.Control type="text" name="businessName" placeholder="enter your business name" value={formik.values.businessName} onBlur={formik.handleBlur} onChange={formik.handleChange} /> 
                        {formik.touched.businessName && formik.errors.businessName ? <Form.Text className="error-text">{formik.errors.businessName}</Form.Text> : null} 
                    </Form.Group>
                    <Form.Group className="signup-form-fields">
                        <Form.Control type="text" name="address" placeholder="enter the address" value={formik.values.address} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.address && formik.errors.address ? <Form.Text className="error-text">{formik.errors.address}</Form.Text> : null} 
                    </Form.Group>
                    <Button className="signup-button" type="submit">Sign up</Button>
                </Form>
            </div>
        </div>
    )
}

export default Register
