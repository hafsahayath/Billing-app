import React from 'react'
import BillFromInfo from './BillFromInfo'
import BillSubContainer from './BillSubContainer'

const BillContainer = () => {
    return (
        <div>
            <h1>Create Invoice</h1>
            <BillFromInfo />
            <BillSubContainer />
        </div>
    )
}

export default BillContainer