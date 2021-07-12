import React, { Profiler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { asyncGetProducts } from '../../actions/productActions'
import ProductItem from './ProductItem'

const ProductList = (props) => {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.products)
    const [edit, setEdit] = useState(false)
    const [search, setSearch] = useState('')
    const [listSearchData, setListSearchData] = useState([])
    const [select, setSelect] = useState('')

    useEffect(()=>{
        dispatch(asyncGetProducts())
    },[edit])

    useEffect(()=>{
        if(search===''){
            setListSearchData([...products])
        } else {
            const res = products.filter(ele=>{
                return (ele.name.toLowerCase().includes(search.toLowerCase()))
            })
            setListSearchData(res)
        }
    },[products, search])

    const editToggle = () => {
        setEdit(!edit)
    }

    const resetSearch = () => {
        setSearch('')
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSelectChange = (e) => {
        let option = e.target.value
        setSelect(option)
        if(option===''){
            setListSearchData([...products])
        } else if(option==='highToLow'){
            const res = listSearchData.sort((a,b)=>b.price-a.price)
            setListSearchData(res)
        } else if(option==='lowToHigh'){
            const res = listSearchData.sort((a,b)=>a.price-b.price)
            setListSearchData(res)
        }
    }

    return (
        <div>
            {
                products.length > 0 && 
            <>
                <h2>Products List</h2>
                <input type="text" value={search} placeholder="search by name" onChange={handleSearchChange} />
                <select value={select} onChange={handleSelectChange}>
                    <option value="">select</option>
                    <option value="highToLow">High to low</option>
                    <option value="lowToHigh">Low to High</option>
                </select>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchData.map(ele=>{
                            return <ProductItem key={ele._id} {...ele} editToggle={editToggle} resetSearch={resetSearch}/>
                        })}
                    </tbody>
                </Table>
            </>
            }
        </div>
    )
}

export default ProductList
