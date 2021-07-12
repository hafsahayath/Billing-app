import React from 'react'

const FormItem = ({formik, buttonName}) => {
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} /> <br />
                    {formik.touched.name && formik.errors.name ? <small>{formik.errors.name}</small> : null}
                </div>
                <div>
                    <label>Mobile</label>
                    <input type="text" name="mobile" value={formik.values.mobile} onBlur={formik.handleBlur} onChange={formik.handleChange} /> <br />
                    {formik.touched.mobile && formik.errors.mobile ? <small>{formik.errors.mobile}</small> : null}
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} /> <br />
                    {formik.touched.email && formik.errors.email ? <small>{formik.errors.email}</small> : null}
                </div>
                <button type="submit">{buttonName}</button>
            </form>    
        </div>
    )
}

export default FormItem
