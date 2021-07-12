import React from 'react'
import { useSelector } from 'react-redux'

const BillFromInfo = (props) => {
    const account = useSelector(state=>state.account)

    return (
        <div>
            <h1>LOGO</h1>
            <h3>{account.businessName}</h3>
            <h3>{account.address}</h3>
        </div>
    )
}

export default BillFromInfo
