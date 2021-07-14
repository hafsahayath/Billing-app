import React from 'react'
import BillHeader from './BillHeader'
import BillSubContainer from './BillSubContainer'

const BillContainer = () => {
    return (
        <div>
            <h1>Create Invoice</h1>
            <BillHeader />
            <BillSubContainer />
        </div>
    )
}

export default BillContainer