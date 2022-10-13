import React, {Fragment,useEffect} from 'react'
import "./Home.css";
import {searchproductaction,clearerror} from "../../actions/productactions.js"
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import Metadata from "../layout/Metadata.js"
import Loader from "../layout/loader/Loader.js"
import Productcard from './Productcard';

const Home = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {allproduct,loading,error}=useSelector((state)=>state.allproductred)


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }

        dispatch(searchproductaction());
    },[dispatch,alert,error])
  return (
    <Fragment>
        {loading?(<Loader/>):(
             <Fragment>
                <Metadata title={`Home-Page`}/>
             <div className="banner">
                 <p>welcome to e-commerce</p>
                 <h2>ECOMMERCE PRODUCTS</h2>
                 <a href="#container"><button>scrol down</button></a>
             </div>
             <div className="productheading">FEATURED PRODUCTS</div>
     
             <div className="container" id="container">
                {allproduct &&
                allproduct.map((product)=><Productcard product={product} key={product._id}/>)
                }
             </div>
         </Fragment>
        )}
    </Fragment>
   
  )
}

export default Home