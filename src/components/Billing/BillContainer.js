import React from 'react'
import BillHeader from './BillHeader'
import BillSubContainer from './BillSubContainer'
import '../../styles/billStyles/billContainer.css'

const BillContainer = () => {
    return (
        <div style={{margin:'10px', width:'100%', textAlign:"center", position:'relative'}}>
            <div style={{backgroundColor:"#4D7DE3",width:"300px", marginBottom:"20px", borderRadius:"5px", marginLeft:"160px"}}>
                <h1 style={{color:"#fff"}}>Create Invoice</h1>
            </div>
            <div className="bill-container">
                <BillHeader />
                <BillSubContainer />
            </div>
        </div>
    )
}

export default BillContainer