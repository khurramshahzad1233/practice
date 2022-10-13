import { createReducer } from "@reduxjs/toolkit"

const cartinitialstate={
    cartitem:localStorage.getItem("cartitem")?JSON.parse(localStorage.getItem("cartitem")):[],
    shippinginfo:localStorage.getItem("shippinginfo")?JSON.parse(localStorage.getItem("shippinginfo")):{},
}

export const cartreducer=createReducer(cartinitialstate,{
    ADD_TO_CART_SUCCESS:(state,action)=>{
        const item=action.payload;
        const isitemexist=state.cartitem.find((i)=>i.product===item.product);

        if (isitemexist) {
            return{
                ...state,
                cartitem:state.cartitem.map((i)=>(i.product===isitemexist.product?item:i))
            };
            
        } else {
            return{
                ...state,
                cartitem:[...state.cartitem,item],
            }
            
        }
    },
    REMOVE_CART_ITEM:(state,action)=>{
        return{
            ...state,
            cartitem:state.cartitem.filter((item)=>item.product!==action.payload)
        }
    },
    SAVE_SHIPPING_INFO:(state,action)=>{
        return{
            ...state,
            shippinginfo:action.payload,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
})