import React,{Fragment, useEffect,useState} from 'react';
import "./Processorder.css";
import Metadata from "../layout/Metadata.js"
import {orderdetailaction,clearerror, orderstatusaction} from "../../actions/orderaction.js"
import {useDispatch,useSelector} from "react-redux"
import {useParams,useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar.js";
import {useAlert} from "react-alert"
import { Typography } from '@material-ui/core';
import {AccountTree} from "@mui/icons-material";
import {Button} from "@mui/material"

const Processorder = () => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const alert=useAlert();
    const navigate=useNavigate()

    const {orderdetail,error,loading}=useSelector((state)=>state.orderdetailred)
    const {error:updateerror,isupdated}=useSelector((state)=>state.orderstatusred)
    const [status,setStatus]=useState("")

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        };
        if(updateerror){
            alert.error(updateerror);
            dispatch(clearerror())
        };
        if(isupdated){
            alert.success("updated successfully");
            dispatch({type:"UPDATE_ORDER_RESET"})

        }

        dispatch(orderdetailaction(id))
    },[dispatch,id,error,updateerror,alert,isupdated]);

    const updatestatussubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData()
        myform.set("status",status);
        dispatch(orderstatusaction(id,myform))

    }
  return (
    <Fragment>
        <Metadata title={`Order Details`}/>
        <Sidebar/>
        <div className="orderdetail">
            <Typography>Shipping info</Typography>
            <div>
                <p>{orderdetail._id}</p>
                <p>{orderdetail.user && orderdetail.user.name}</p>
                <p>{orderdetail.shippinginfo && orderdetail.shippinginfo.phoneno}</p>
                <p>{orderdetail.shippinginfo &&
                `${orderdetail.shippinginfo.address},${orderdetail.shippinginfo.city},
                ${orderdetail.shippinginfo.country}` 
                
                }</p>

            </div>
        </div>
        <Typography>Payment info</Typography>

        <div className={orderdetail.paymentinfo && 
        orderdetail.paymentinfo.status==="succeeded"?"pay":"info"} >
            <div>{orderdetail.paymentinfo && orderdetail.paymentinfo.status==="succeeded"?"paid":"notpaid"}</div>
        </div>
        <div>
            <Typography>Order Items</Typography>
            <div>{orderdetail.orderitem && orderdetail.orderitem.map((order)=>(
                <div key={order.product}><img src={order.image} alt="product" width="80px" />
                <p>{order.name}</p><span>{order.quantity}</span>{order.price}<span></span>
                <p>{order.quantity}X{order.price} <span>{order.quantity*order.price}</span></p>
                </div>
            ))}</div>
        </div>

        <div>
            <form
            onSubmit={updatestatussubmithandler}
            >
                <Typography>update order status</Typography>
                <div>
                <AccountTree/>
                <select onChange={(e)=>setStatus(e.target.value)}>
                    <option value={""}>Choose order status</option>
                    {orderdetail.orderstatus==="processing" && (
                        <option value="shipped">shipped</option>
                    )}
                    {orderdetail.orderstatus==="shipped" && (
                        <option value="delivered">delivered</option>
                    )}

                </select>
                </div>
                <Button type='submit'>Process</Button>

                
                
                

            </form>

        </div>
        
    </Fragment>
  )
}

export default Processorder