import axios from "axios"

export const orderaction=(orderdata)=>async(dispatch)=>{
    try {
        dispatch({
            type:"NEW_ORDER_REQUEST"
        })
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.post("/api/order/new",orderdata,config);
        dispatch({
            type:"NEW_ORDER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"NEW_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};
export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
}


export const myorderaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"MY_ORDER_REQUEST"});
        const {data}=await axios.get("/api/order/me");

        dispatch({
            type:"MY_ORDER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"MY_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const orderdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ORDER_DETIAL_REQUEST"})
        const {data}=await axios.get(`/api/order/${id}`)

        dispatch({
            type:"ORDER_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ORDER_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const alladminorderaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_ADMIN_ORDER_REQUEST"})
        const {data}=await axios.get("/api/admin/order")
        dispatch({
            type:"ALL_ADMIN_ORDER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_ADMIN_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const orderdeleteaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_ORDER_REQUEST"})
        const {data}=await axios.delete(   `/api/admin/order/${id}`)
        dispatch({
            type:"DELETE_ORDER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const orderstatusaction=(id,orderdata)=>async(dispatch)=>{
    try {
        dispatch({type:"ORDER_STATUS_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.put(`/api/admin/order/${id}`,orderdata,config)
        dispatch({
            type:"ORDER_STATUS_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ORDER_STATUS_FAIL",
            payload:error.response.data.message,
        })
        
    }
}