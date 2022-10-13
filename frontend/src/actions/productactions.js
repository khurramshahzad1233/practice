import axios from "axios"


export const searchproductaction=(keyword="",currentpage=1,price=[0,25000],ratings=0,category)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_PRODUCT_REQUEST"});
        let link=`/api/product/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (category) {
            category && 
            category==="all"?(link=`/api/product/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            ):(link=`/api/product/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`
            )
        } 
            const {data}=await axios.get(link);
            dispatch({
                type:"ALL_PRODUCT_SUCCESS",
                payload:data,
            })
            
    } catch (error) {
        dispatch({
            type:"ALL_PRODUCT_FAIL",
            payload:error.response.data.message,
        })
        
    }

};

export const clearerror=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR"
    })
};


export const productdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"PRODUCT_DETAIL_REQUEST"});
        
        const {data}=await axios.get(`/api/product/${id}`);
        dispatch({
            type:"PRODUCT_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"PRODUCT_DETAIL_FAIL",
            payload:error.response.data.message
        })
        
    }
}

export const createreviewaction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({type:"CREATE_REVIEW_REQUEST"});
        const consfig={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.put("/api/review/new",userdata,consfig);
        dispatch({
            type:"CREATE_REVIEW_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"CREATE_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const allreviewaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_REVIEW_REQUEST"});
        const {data}=await axios.get(`/api/reviews?id=${id}`);

        dispatch({
            type:"ALL_REVIEW_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"ALL_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const alladminproductaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_ADMIN_PRODUCT_REQUEST"})
        const {data}=await axios.get("/api/admin/product")
        dispatch({
            type:"ALL_ADMIN_PRODUCT_SUCCESS",
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_ADMIN_PRODUCT_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const newproductaction=(productdata)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_PRODUCT_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.post("/api/admin/product/new",productdata,config);
        dispatch({
            type:"NEW_PRODUCT_SUCCESS",
            payload:data,
        })

        
        
    } catch (error) {
        dispatch({
            type:"NEW_PRODUCT_FAIL",
            payload:error.response.data.message,
        })
        
    }

};

export const deleteproductaction=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"DELETE_PRODUCT_REQUEST"
        });
        const {data}=await axios.delete(`/api/admin/product/${id}`);
        dispatch({
            type:"DELETE_PRODUCT_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_PRODUCT_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const updateproductaction=(id,productdata)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PRODUCT_REQUEST"})
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.put(`/api/admin/product/${id}`,productdata,config);
        dispatch({
            type:"UPDATE_PRODUCT_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_PRODUCT_FAIL",
            payload:error.response.data.message,
        })
        
    }
}