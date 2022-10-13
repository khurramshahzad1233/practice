import React,{Fragment,useEffect} from 'react'
import "./Orderdetail.css"
import Metadata from "../layout/Metadata.js"
import {useDispatch,useSelector} from "react-redux"
import {orderdetailaction,clearerror} from "../../actions/orderaction"
import {useParams} from "react-router-dom"
import Loader from "../layout/loader/Loader.js";
import {useAlert} from "react-alert"
import {Typography} from "@mui/material"


const Orderdetail = () => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const alert=useAlert()

    const {loading,orderdetail,error}=useSelector((state)=>state.orderdetailred)


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }

        dispatch(orderdetailaction(id))
    },[dispatch,id,error,alert])


  return (
    <Fragment>{loading?(<Loader/>):(
        <Fragment>
        <Metadata title={`Order-Details`}/>
        <div className="orderdetailcontainer">
            <div className="orderdetailbox">
                <Typography>order no:
                    
                     {orderdetail && orderdetail._id}</Typography>
                     <Typography>Shipping Info</Typography>


                     <p>Name:{orderdetail.user && orderdetail.user.name}</p>
                     <span>Address:{orderdetail.shippinginfo && `
                     ${orderdetail.shippinginfo.address} ${orderdetail.shippinginfo.city} ${orderdetail.shippinginfo.state} ${orderdetail.shippinginfo.country}`

                     
                     }</span>



                     <Typography>Payment Info</Typography>

                     <div className={orderdetail.paymentinfo && orderdetail.paymentinfo.status==="succeeded"?"greencolor":"redcolor"}>
                        {orderdetail.paymentinfo && orderdetail.paymentinfo.status==="succeeded"?"Paid":"not paid"}
                     </div>


        
            </div>
        </div>
        <div className="orderdetailaction">
            <Typography>Order Items</Typography>
            
        </div>

    </Fragment>
    )}</Fragment>
    
  )
}

export default Orderdetail