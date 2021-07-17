import React from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

const CustomerContainer = (props) => {
    return (
        <div style={{display:'flex', flexDirection: 'column', paddingLeft:'20px'}}>
            <CustomerForm />
            <CustomerList />
        </div>
    )
}

export default CustomerContainer
