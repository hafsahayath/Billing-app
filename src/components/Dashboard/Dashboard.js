import React from 'react'
import StatsContainer from './StatsContainer'

const Dashboard = (props) => {
    return (
        <div style={{marginLeft:'10px'}}>
            <h2 style={{color:'#4D7DE3'}}>Dashboard</h2>
            <StatsContainer />
        </div>
    )
}

export default Dashboard