import axios from "axios";

export const registeruseraction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({type:"REGISTER_USER_REQUEST"})
        const config={
            headers:{
                "content-type":"multiple/form-data",
            }
        };
        const {data}=await axios.post(`/api/user/register`,userdata,config)

        dispatch({
            type:"REGISTER_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REGISTER_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
}

export const loginaction=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"LOGIN_USER_REQUEST"})
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.post(`/api/user/login`,{email,password},config)

        dispatch({
            type:"LOGIN_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGIN_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const loadaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"LOAD_USER_REQUEST"});
        const {data}=await axios.get(`/api/me`);

        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const logoutaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"LOGOUT_USER_REQUEST"})
        const {data}=await axios.get("/api/logout");
        dispatch({
            type:"LOGOUT_USER_SUCCESS",
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:"LOGOUT_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const getalladminuseraction=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"ALL_ADMIN_USER_REQUEST"
        });
        const {data}=await axios.get("/api/admin/user");
        dispatch({
            type:"ALL_ADMIN_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_ADMIN_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const deleteuseraction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_USER_REQUEST"});
        const {data}=await axios.delete(`/api/admin/user/${id}`);
        dispatch({
            type:"DELETE_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const userroleaction=(id,updateuser)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_ROLE_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        }
        const {data}=await axios.put(`/api/admin/user/${id}`,updateuser,config)
        dispatch({
            type:"UPDATE_ROLE_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_ROLE_FAIL",
            payload:error.respnse.data.message,
        })
        
    }
};

export const userdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"USER_DETAIL_REQUEST"})
        const {data}=await axios.get(`/api/admin/user/${id}`);
        dispatch({
            type:"USER_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"USER_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}