import {createReducer} from "@reduxjs/toolkit";

const orderinitialstate={
    order:{}
};
export const orderreducer=createReducer(orderinitialstate,{
    NEW_ORDER_REQUEST:(state,action)=>{
        return{
            loading:true,
            order:{}

        }
    },
    NEW_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            order:action.payload.neworder,
        }
    },
    NEW_ORDER_FAIL:(state,action)=>{
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

const myorderinitialstate={
    order:[]
};
export const myorderreducer=createReducer(myorderinitialstate,{
    MY_ORDER_REQUEST:(state,action)=>{
        return{
            loading:true,
            order:[]
        }
    },
    MY_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            order:action.payload.myorder
        }
    },
    MY_ORDER_FAIL:(state,action)=>{
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
})

const orderdetailinitialstate={
    orderdetail:{}
};
export const orderdetailreducer=createReducer(orderdetailinitialstate,{
    ORDER_DETAIL_REQUEST:(state,action)=>{
        return{
            loading:true,
            orderdetail:{}
        }
    },
    ORDER_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            orderdetail:action.payload.order,
        }
    },
    ORDER_DETAIL_FAIL:(state,action)=>{
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

const alladminorderinitialstate={
    alladminorder:[]
};
export const alladminorderreducer=createReducer(alladminorderinitialstate,{
    ALL_ADMIN_ORDER_REQUEST:(state,action)=>{
        return{
            loading:true,
            alladminorder:[]
        }
    },
    ALL_ADMIN_ORDER_SUCCESS:(state,action)=>{
        return{
            laoding:false,
            alladminorder:action.payload.allorder,
        }
    },
    ALL_ADMIN_ORDER_FAIL:(state,action)=>{
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

const deleteorderinitialstate={
    deleteorder:{}
};
export const deleteorderreducer=createReducer(deleteorderinitialstate,{
    DELETE_ORDER_REQUEST:(state,action)=>{
        return{
            loading:true,
            isdeleted:false,
        }
    },
    DELETE_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            isdeleted:action.payload.success,
        }
    },
    DELETE_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            isdeleted:false,
        }

    },
    DELETE_ORDER_RESET:(state,action)=>{
        return{
            loading:false,
            isdeleted:false,
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

const orderstatusinitialstate={
    orderstatus:{}
};
export const orderstatusreducer=createReducer(orderstatusinitialstate,{
    ORDER_STATUS_REQUEST:(state,action)=>{
        return{
            loading:true,
            ...state,
        }
    },
    ORDER_STATUS_SUCCESS:(state,action)=>{
        return{
            loading:false,
            isupdated:action.payload.success,
        }
    },
    ORDER_STATUS_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            isupdated:false,
        }
    },
    ORDER_STATUS_RESET:(state,action)=>{
        return{
            ...state,
            isupdated:false,
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