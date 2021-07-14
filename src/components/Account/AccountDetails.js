import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetAccDetails } from '../../actions/accountDetailsActions'

const AccountDetails = (props) => {
    const account = useSelector(state=>state.account)
    const dispatch = useDispatch()

    // console.log(account)

    useEffect(()=>{
        dispatch(asyncGetAccDetails())
    },[])

    return (
        <div>
            <h1>Account Details</h1>
            <h2>{account.businessName}</h2>
            <h2>{account.address}</h2>
        </div>
    )
}

export default AccountDetails