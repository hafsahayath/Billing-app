import React from 'react'
import { useSelector } from 'react-redux'
import Stats from './Stats'
import CustomersChart from './CustomersChart'
import TableTopOrders from './TableTopOrders'
import TopProductsSold from './TopProductsSold'

const StatsContainer = (props) => {
    const customers = useSelector(state=>state.customers)
    const bills = useSelector(state=>state.bills)
    const products = useSelector(state=>state.products)

    const totalCustomers = customers.length
    const totalOrders = bills.length
    const totalRevenue = bills.reduce((acc, curr)=>acc+curr.total,0)
    const totalProductsInInventory = products.length

    return (
        <div className="mx-4">
            { customers && bills && products ?
            <>
                <div className="row d-flex mt-2 ml-1">
                    <div className="col-3">
                        <Stats variant="Info" Header="Customers" value={totalCustomers}/>
                    </div>
                    <div className="col-3">
                        <Stats variant="Warning" Header="Orders" value={totalOrders}/>
                    </div>
                    <div className="col-3">
                        <Stats variant="Success" Header="Total Revenue" value={totalRevenue}/>
                    </div>
                    <div className="col-3">
                        <Stats variant="Danger" Header="Inventory" value={totalProductsInInventory}/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-2">
                    <div className="col-3 mr-5">
                        <CustomersChart bills={bills} customers={customers}/>
                    </div>
                    <div className="col-8 table-top-bills ml-3">
                        <p style={{textDecoration:'underline'}}><b>Top 5 products</b></p>
                        <TopProductsSold products={products} bills={bills}/>                   
                    </div>
                </div>
                <div className="row mx-3 mt-3">
                    <div style={{backgroundColor: "white", boxShadow: '0 5px 5px -5px #888888', marginLeft:'10px'}} className="col">
                        <TableTopOrders bills={bills} customers={customers}/>
                    </div>
                </div>
            </> : null
            }
        </div>
    )
}

export default StatsContainer
