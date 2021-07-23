import React from 'react'
import { useSelector } from 'react-redux'
import StatsContainer from './StatsContainer'

const Dashboard = (props) => {
    const account = useSelector(state=>state.account)
    return (
        <div style={{marginLeft:'10px'}}>
            <div style={{backgroundColor:'#4D7DE3',width:'350px', marginLeft:'40px', marginTop:'10px', borderRadius:"5px"}}>
                <h2 style={{color:'#fff'}}>Dashboard - {account.username} </h2>
            </div>
            <StatsContainer />
        </div>
    )
}

export default Dashboard