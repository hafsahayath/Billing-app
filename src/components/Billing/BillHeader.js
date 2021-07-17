import React from 'react'
import { useSelector } from 'react-redux'

const BillHeader = (props) => {
    const account = useSelector(state=>state.account)

    return (
        <address>
            <strong>{account.businessName}</strong> <br/>
            {account.address}
        </address>
    )
}

export default BillHeader
