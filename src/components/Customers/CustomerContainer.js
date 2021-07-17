import React from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

const CustomerContainer = (props) => {
    return (
        <div style={{display:'flex', flexDirection: 'column'}}>
            <CustomerForm />
            <CustomerList />
        </div>
    )
}

export default CustomerContainer
