import axios from "axios";

export const cartaction=(id,quantity)=>async(dispatch,getstate)=>{
    
       
        const {data}=await axios.get(`/api/product/${id}`)
        dispatch({
            type:"ADD_TO_CART_SUCCESS",
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                quantity,
                image:data.product.image[0].url,
            }
        });
        localStorage.setItem("cartitem",JSON.stringify(getstate().cartred.cartitem))
    
}

export const removecartaction=(id)=>async(dispatch,getstate)=>{
    dispatch({
        type:"REMOVE_CART_ITEM",
        payload:id,
    })
    localStorage.setItem("cartitem",JSON.stringify(getstate().cartred.cartitem))
}

export const saveshippinginfo=(data)=>async(dispatch)=>{
    dispatch({
        type:"SAVE_SHIPPING_INFO",
        payload:data,
    })
    localStorage.setItem("shippinginfo",JSON.stringify(data));
}

