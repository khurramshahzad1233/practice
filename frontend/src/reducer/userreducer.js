import {createReducer} from "@reduxjs/toolkit"




const userinitialstate={
    user:{}
};
export const userreducer=createReducer(userinitialstate,{
    REGISTER_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            user:{},
            isAuthenticated:false,
        }
    },
    REGISTER_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:action.payload.user,
            isAuthenticated:true,
        }
    },
    REGISTER_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            user:null,
            isAuthenticated:false,
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    },
    LOGIN_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            user:{},
            isAuthenticated:false,
        }
    },
    LOGIN_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:action.payload.user,
            isAuthenticated:true,
        }
    },
    LOGIN_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            isAuthenticated:false,
            user:{},
            error:action.payload,
        }
    },

    LOAD_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            user:{},
            isAuthenticated:false,
        }
    },
    LOAD_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            isAuthenticated:true,
            user:action.payload.user,
            
        }
    },
    LOAD_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            user:null,
            isAuthenticated:false,
            error:action.payload
        }
    },
    LOGOUT_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            logout:false,
        }
    },
    LOGOUT_USER_SUCCESS:(state,action)=>{
        return{
           
            loading:false,
            logout:action.payload.success,
            user:null,
            isAuthenticated:false,
            
        }
    },
    LOGOUT_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            ...state,
        }
    }

});

const alladminuserinitialstate={
    alladminuser:[]
};
export const alladminuserreducer=createReducer(alladminuserinitialstate,{
    ALL_ADMIN_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            alladminuser:[]
        }
    },
    ALL_ADMIN_USER_SUCCESS:(state,action)=>{
        return{
            laoding:false,
            alladminuser:action.payload.alluser,
        }
    },
    ALL_ADMIN_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});

const deleteuserinitialstate={
    deleteuser:{}
};
export const deleteuserreducer=createReducer(deleteuserinitialstate,{
    DELETE_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            ...state,
        }
    },
    DELETE_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            isdeleted:action.payload.success,
        }
    },
    DELETE_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            isdeleted:false,
            error:action.payload,
        }
    },
    DELETE_USER_RESET:(state,action)=>{
        return{
            ...state,
            isdeleted:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});

const userroleinitialstate={
    role:{}
};
export const userrolereducer=createReducer(userroleinitialstate,{
    UPDATE_ROLE_REQUEST:(state,action)=>{
        return{
            loading:true,
            ...state,
        }
    },
    UPDATE_ROLE_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isupdated:action.payload.success,
        }
    },
    UPDATE_ROLE_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            isupdated:false,
        }
    },
    UPDATE_ROLE_RESET:(state,action)=>{
        return{

            loading:false,
            isupdated:false,
        }
    },
    CLEAR_ERROR:(state,action )=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});

const userdetailinitialstate={
    user:{}
};

export const userdetailreducer=createReducer(userdetailinitialstate,{
    USER_DETAIL_REQUEST:(state,action)=>{
        return{
            loading:true,
            user:{}
        }
    },
    USER_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:action.payload.user,
        }
    },
    USER_DETAIL_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }

})