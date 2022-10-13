import React,{Fragment} from 'react'
import "./Cart.css"
import { useSelector,useDispatch } from 'react-redux';
import {Typography} from "@mui/material"
import {RemoveShoppingCart} from "@mui/icons-material"
import { Link,useNavigate } from 'react-router-dom';
import Cartitemcart from './Cartitemcart';
import {removecartaction,cartaction} from "../../actions/cartaction.js"


const Cart = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const {cartitem}=useSelector((state)=>state.cartred);

    const deletecartitem=(id)=>{
        dispatch(removecartaction(id))
    };

    const increasequantity=(id,quantity,stock)=>{
        if(stock<=quantity)return;
        let newqty=quantity+1;
        dispatch(cartaction(id,newqty))

    }
    const decreasequantity=(id,quantity)=>{
        if(quantity<=1)return;
        let newqty=quantity-1;
        dispatch(cartaction(id,newqty))

    }
    const checkouthandler=(e)=>{
        navigate(`/login?redirect=shipping`)

    }
  return (
    <Fragment>{cartitem.length===0?(
        <Fragment>
            <Typography>No item in Your Cart</Typography>
            <RemoveShoppingCart/>
            <Link to={`/products`}>View Products</Link>


        </Fragment>
    ):(
        <Fragment>
            <div>
                <div className="productdetail">
                    {cartitem && 
                    cartitem.map((item)=>(
                        <div key={item.product}><Cartitemcart item={item} deletecartitems={deletecartitem}/>
                        <div>
                            <button onClick={(e)=>increasequantity(item.product,item.quantity,item.stock)}>+</button>
                            <input type="number"
                            value={item.quantity}
                            readOnly
                            />
                            <button onClick={(e)=>decreasequantity(item.product,item.quantity)}>-</button>
                        </div>
                        </div>
                    ))}
                </div>
                <div className="productquantity">
                    
                </div>
                <div className="subtotal"></div>
            </div>

            <div className="total">
                <p>{cartitem.reduce((acc,item)=>acc+item.quantity*item.price,0)}</p>
            </div>

            <div><button onClick={checkouthandler}>checout</button></div>
        </Fragment>
    )}</Fragment>
  )
}

export default Cart