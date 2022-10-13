import React,{Fragment} from 'react';

import Metadata from "../layout/Metadata.js";
import Checkoutstep from "./Checkoutstep.js"
import { Typography } from '@mui/material';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"


const Confirmorder = () => {
    const navigate=useNavigate()

    const {user}=useSelector((state)=>state.userred);
    const {cartitem,shippinginfo}=useSelector((state)=>state.cartred)

    const Address=`${shippinginfo.address},${shippinginfo.city},${shippinginfo.state},${shippinginfo.country}`

    const subtotal=cartitem.reduce((acc,item)=>acc+item.price*item.quantity,0);
    const tax=subtotal*0.10;
    const shippingcharges=subtotal>1000?0:200;
    const totalprice=subtotal+tax+shippingcharges;

    const proceedtopayment=(e)=>{
        const data={
            subtotal,
            tax,
            shippingcharges,
            totalprice
        };
        sessionStorage.setItem("orderinfo",JSON.stringify(data));
        navigate(`/process/payment`)
    }
  return (
    <Fragment>
        <Metadata title={`Confirm Order`}/>
        <Checkoutstep activestep={1}/>
        <div className="confirmordercontainer">
            <div className="confirmorderbox">
                <div className="shippinginfor">
                    <Typography>Shipping Info</Typography>
                    <p>Name</p><span>{user.name}</span>
                    <p>Phone No</p><span>{shippinginfo.phoneno}</span>
                    <p>Address</p><span>{Address}</span>
                </div>

                <div className="cartitemdetails">
                    {
                        cartitem && cartitem.map((item)=>(
                            <div key={item.product}><img src={item.image} alt="product" width="80px" height="80px"/>
                            {item.name}
                            <span>{item.price}x{item.quantity}={""}</span>
                            <span>{item.price*item.quantity}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="ordersummary">
                <Typography>Order Summary</Typography>

                <p>subtotal</p>
                <span>{subtotal}</span>

                <div>
                    <p>GST:</p>
                    <span>{tax}</span>
                </div>
                <div>
                    <p>Shipping Charges</p>
                    <span>{shippingcharges}</span>
                </div>
                <div>
                    <p>Total</p>
                    <span>{totalprice}</span>
                </div>
            </div>
        </div>
        <div><button onClick={proceedtopayment}>Proceed To Payment</button></div>

    </Fragment>
  )
}

export default Confirmorder