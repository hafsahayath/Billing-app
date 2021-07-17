import React from 'react'
import BillHeader from './BillHeader'
import BillSubContainer from './BillSubContainer'
import '../../styles/billStyles/billContainer.css'

const BillContainer = () => {
    return (
        <div style={{margin:'10px', width:'100%',textAlign:'center', position:'relative'}}>
            <h1>Create Invoice</h1>
            <div className="bill-container">
                <BillHeader />
                <BillSubContainer />
            </div>
        </div>
    )
}

export default BillContainer