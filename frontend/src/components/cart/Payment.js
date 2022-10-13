import React,{Fragment,useRef,useEffect} from 'react'
import Metadata from "../layout/Metadata.js"
import Checkoutstep from "./Checkoutstep.js"
import { CreditCard,Event,VpnKey } from '@mui/icons-material'
import {useStripe,useElements,CardCvcElement,CardNumberElement,CardExpiryElement} from "@stripe/react-stripe-js"
import axios from "axios";
import {useAlert} from "react-alert"
import {useSelector,useDispatch} from "react-redux"
import { orderaction,clearerror } from '../../actions/orderaction.js';
import {useNavigate} from "react-router-dom"

const Payment = () => {
    const alert=useAlert();
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const orderinfo=JSON.parse(sessionStorage.getItem("orderinfo"))
    const {shippinginfo,cartitem}=useSelector((state)=>state.cartred);
    const {error}=useSelector((state)=>state.orderred)
    const {user}=useSelector((state)=>state.userred)
    const payBtn=useRef(null);

    const stripe=useStripe();
    const elements=useElements()
    let total=orderinfo.totalprice.toFixed(2);
    let paymentdata={
        amount:Math.round(total*100)
    };

    const order={
        shippinginfo:shippinginfo,
        orderitem:cartitem,
        itemprice:orderinfo.subtotal,
        taxprice:orderinfo.tax,
        shippingprice:orderinfo.shippingcharges,
    }



    const paymentsubmithandler=async(e)=>{
        e.preventDefault()
        payBtn.current.disabled=true;
        try {
            const config={
                headers:{
                    "content-type":"application/json"
                }
            };
            const {data}=await axios.post("/api/payment/process",paymentdata,config);

            const client_secret=data.client_secret;
            if(!stripe||!elements)return;
            const result=await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippinginfo.address,
                            city:shippinginfo.city,
                            state:shippinginfo.state,
                            country:shippinginfo.country,
                            postal_code:shippinginfo.pincode,
                        }
                    }
                }
            });
            if(result.error){
                payBtn.current.disabled=false;
                alert.error(result.error.message)
            }else{
                if(result.paymentIntent.status==="succeeded"){
                    order.paymentinfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status,
                    }
                    dispatch(orderaction(order));
                    navigate("/success") 
                    
                }else{
                    alert.error("some error")
                }
            }
        } catch (error) {
            payBtn.current.disabled=false;
            alert.error(error.response.data.message)
            
        }
    };
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
    },[dispatch,error,alert])

  return (


    <Fragment>
        <Metadata title={`Payment Process`}/>
        <Checkoutstep activestep={2}/>

        <form
        onSubmit={paymentsubmithandler}
        >
            <div>
                <CreditCard/>
                <CardNumberElement/>
            </div>
            <div>
                <Event/>
                <CardExpiryElement/>
            </div>
            <div>
                <VpnKey/>
                <CardCvcElement/>
            </div>

            <input type="submit"
            value={`Pay=$${orderinfo && orderinfo.totalprice}`}
            ref={payBtn}
            />
        </form>

    </Fragment>
  )
}

export default Payment