import React, {Fragment,useState,useEffect} from 'react';
import "./Product.css"
import {Typography,Slider} from "@mui/material";
import {searchproductaction,clearerror} from "../../actions/productactions.js"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import Loader from "../layout/loader/Loader.js"
import Productcard from '../home/Productcard';
import Pagination from "react-js-pagination"


const Product = () => {
    const dispatch=useDispatch();
    const alert=useAlert()


    const [currentpage,setCurrentpage]=useState(1)
    const [price,setPrice]=useState([0,25000])
    const [ratings, setRatings]=useState(0);
    const [category, setCategory]=useState("");
    const {keyword}=useParams();

    const {allproduct,error,loading,productcount,resultperpage}=useSelector((state)=>state.allproductred);
    const categories=[
        "all",
        "electronics",
        "garment",
        "mobile",
        "hardwares",
        "jeans",
        "shirts"
    
    ];

    
    const setcurrentpageno=(e)=>{
        setCurrentpage(e)
    }


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }


        dispatch((searchproductaction(keyword,currentpage,price,ratings,category)))
    },[dispatch,keyword,currentpage,price,ratings,category,alert,error])
  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
            <Metadata title={`Product Page`}/>
    
            
    
            <div>
                <Typography>Price</Typography>
                <Slider
    
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                value={price}
                min={0}
                max={25000}
                onChange={(e)=>setPrice(e.target.value)}
            
            /></div>
            <div>
                <Typography>Rating</Typography>
                <Slider
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                value={ratings}
                min={0}
                max={5}
                onChange={(e)=>setRatings(e.target.value)}
                />
            </div>
            <Typography>Category</Typography>
            <ul className='categoryBox'>
                            {categories.map((category)=>(
                                <li className='category-link'
                                key={category}
                                onClick={(e)=>setCategory(category)}>
                                    {category}
    
                                </li>
                            ))}
                        </ul>
                        <div className='productcontainer'>
                            {allproduct &&
                            allproduct.map((product)=>(<Productcard product={product} key={product._id}/>))}
                        </div>

                        <div>
                            {resultperpage<productcount && 
                            (<Pagination
                            onChange={setcurrentpageno}
                            activePage={currentpage}
                            totalItemsCount={productcount}
                            itemsCountPerPage={resultperpage}
                            firstPageText="first"
                            lastPageText="last"
                            nextPageText={"next"}
                            prevPageText="previous"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass='pageLinkActive'

                            />)
                            }
                        </div>

    
           
        </Fragment>
        )}
    </Fragment>
    
  )
}

export default Product;