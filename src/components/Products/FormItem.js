import React from 'react'

const FormItem = ({formik, buttonName}) => {
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="name" name="name" placeholder="enter name of the product" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.name && formik.errors.name ? <small>{formik.errors.name}</small> : null}
                </div>
                <div>
                    <input type="number" name="price" placeholder="enter the price" value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} />  <br />
                    {formik.touched.price && formik.errors.price ? <small>{formik.errors.price}</small>: null }  
                </div>
                <button type="submit">{buttonName}</button>
            </form>            
        </div>
    )
}

export default FormItem