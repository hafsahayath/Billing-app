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
        <div>
            { customers && bills && products ?
            <>
                <div className="row mt-2 mx-2">
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
                <div className="row mt-2 mx-2">
                    <div className="col-4">
                        <CustomersChart bills={bills} customers={customers}/>
                    </div>
                    <div className="col-8 table-top-bills">
                        <strong>Top 5 products</strong>
                        <TopProductsSold products={products} bills={bills}/>                   
                    </div>
                </div>
                <div className="row mt-2 mx-4">
                    <div className="col table-top-bills">
                        <TableTopOrders bills={bills} customers={customers}/>
                    </div>
                </div>
            </> : null
            }
        </div>
    )
}

export default StatsContainer
