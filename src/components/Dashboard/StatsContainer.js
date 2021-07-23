import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import Stats from './Stats'
import CustomersChart from './CustomersChart'
import TableTopOrders from './TableTopOrders'
import TopProductsSold from './TopProductsSold'
import { swalError } from '../../selectors/alert';
import "react-datepicker/dist/react-datepicker.css";

const StatsContainer = (props) => {
    const customers = useSelector(state=>state.customers)
    const bills = useSelector(state=>state.bills)
    const products = useSelector(state=>state.products)
    const [startDate, setStartDate] = useState(new Date());
    const [allTime, setAllTime] = useState(true)
    
    const dateArr = startDate.toLocaleDateString().split("/")
    const buildDate = `${dateArr.pop()}-${dateArr[0].length==1?'0'+dateArr.shift():dateArr.shift()}-${dateArr[0]}`
    
    const billByDateFormat = bills.map(ele=>{
        return {...ele, date: ele.date.split('T')[0]}
    })

    const billByDate = billByDateFormat.filter(ele=>{
        return ele.date === buildDate
    })

    useEffect(()=>{
        if(!allTime){
            if(billByDate.length===0){
                setAllTime(true)
                setStartDate(new Date())
                swalError(`no bills on ${buildDate}`)
            }
        }
        
    },[startDate,allTime])

    const totalRevenueByDate = billByDateFormat.filter(ele=>ele.date===buildDate).reduce((acc, curr)=>acc+curr.total,0)

    const totalCustomers = customers.length
    const totalOrders = bills.length
    const totalRevenue = bills.reduce((acc, curr)=>acc+curr.total,0)
    const totalProductsInInventory = products.length

    const handleDateChange = (date) => {
        setStartDate(date)
        setAllTime(false)
    }

    return (
        <div className="mx-4">
            <div className="d-flex align-items-center pb-2 pl-3 m-1 justify-content-end">
                <DatePicker className="p-1 rounded-sm border border-primary" selected={startDate} onChange={handleDateChange} />
                <Button className="ml-3 px-3" onClick={()=>setAllTime(true)}>All time</Button>
            </div>
            { customers && bills && products ?
            <>
                <div className="row d-flex mt-2 ml-1">
                    <div className="col-3">
                        <Stats variant="Info" Header="Customers" value={totalCustomers}/>
                    </div>
                    <div className="col-3">
                        <Stats variant="Warning" Header={allTime?'orders':`orders on ${buildDate}`} value={allTime? totalOrders : billByDate.length} />
                    </div>
                    <div className="col-3">
                        <Stats variant="Success" Header={allTime?"Total Revenue":`Total Revenue on ${buildDate}`} value={allTime ? totalRevenue : totalRevenueByDate}/>
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
                        <p style={{textDecoration:'underline'}}><b>{allTime? "Top 5 products":`Top 5 products on ${buildDate}`}</b></p>
                        <TopProductsSold products={products} bills={allTime?bills:billByDate} />                   
                    </div>
                </div>
                <div className="row mx-3 mt-3">
                    <div style={{backgroundColor: "white", boxShadow: '0 5px 5px -5px #888888', marginLeft:'10px'}} className="col">
                        <TableTopOrders bills={allTime?bills:billByDate} customers={customers} text={allTime? 'Highest transactions':`Highest transaction on ${buildDate}`}/>
                    </div>
                </div>
            </> : null
            }
        </div>
    )
}

export default StatsContainer
