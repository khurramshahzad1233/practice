import {createReducer} from "@reduxjs/toolkit"

const allproductinitialstate={
    allproduct:[]
};
export const allproductreducer=createReducer(allproductinitialstate,{
    ALL_PRODUCT_REQUEST:(state,action)=>{
        return{
            loading:true,
            allproduct:[]
        }
    },
    ALL_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allproduct:action.payload.product,
            resultperpage:action.payload.resultperpage,
            productcount:action.payload.productcount,
            filterproductcount:action.payload.filterproductcount,
        }
    },
    ALL_PRODUCT_FAIL:(state,action)=>{
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


const productdetailinitialstate={
    productdetail:{}
};
export const productdetailreducer=createReducer(productdetailinitialstate,{
    PRODUCT_DETAIL_REQUEST:(state,action)=>{
        return{
            loading:true,
            productdetail:{},
        }
    },
    PRODUCT_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            productdetail:action.payload.product,
        }
    },
    PRODUCT_DETAIL_FAIL:(state,action)=>{
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
});

const createreviewinitialstate={
    review:{}
};
export const createreviewreducer=createReducer(createreviewinitialstate,{
    CREATE_REVIEW_REQUEST:(state,action)=>{
        return{
            loading:true,
            review:{}

        }
    },
    CREATE_REVIEW_SUCCESS:(state,action)=>{
        return{
            loading:false,
            review:action.payload.success,
        }
    },
    CREATE_REVIEW_FAIL:(state,action)=>{
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
    },
    CREATE_REVIEW_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
        }
    }
})

const allreviewinitialstate={
    allreview:[]
};

export const allreviewreducer=createReducer(allreviewinitialstate,{
    ALL_REVIEW_REQUEST:(state,action)=>{
        return{
            loading:false,
            allreview:[]
        }
    },
    ALL_REVIEW_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allreview:action.payload.allreview
        }
    },
    ALL_REVIEW_FAIL:(state,action)=>{
        return{
            loading:false,
            ...state,
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

});

const alladminproductinitialstate={
    alladminproduct:[]
};
export const alladminproductreducer=createReducer(alladminproductinitialstate,{
    ALL_ADMIN_PRODUCT_REQUEST:(state,action)=>{
        return{
            loading:true,
            alladminproduct:[]
        }
    },
    ALL_ADMIN_PRODUCT_SUCCESS:(state,action)=>{
        return{
            laoding:false,
            alladminproduct:action.payload.allproduct,
        }
    },
    ALL_ADMIN_PRODUCT_FAIL:(state,action)=>{
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

const newproductinitialstate={
    newproduct:{}
};
export const newproductreducer=createReducer(newproductinitialstate,{
    NEW_PRODUCT_REQUEST:(state,action)=>{
        return{
            loading:true,
            newproduct:{}
        }
    },
    NEW_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            newproduct:action.payload.product,
            success:action.payload.success,
        }
    },
    NEW_PRODUCT_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    NEW_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
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
    },
    
});

const deleteproductinitialstate={
    deleteproduct:{}
};
export const deleteproductreducer=createReducer(deleteproductinitialstate,{
    DELETE_PRODUCT_REQUEST:(state,action)=>{
        return{
            loading:true,
            deleteproduct:{}
        }
    },
    DELETE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            isdeleted:action.payload.success,
        }
    },
    DELETE_PRODUCT_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            isdeleted:action.payload
        }
    },
    DELETE_PRODUCT_RESET:(state,action)=>{
        return{
            loading:false,
            ...state,
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
})

const updateproductinitialstate={
    updateproduct:{}
};
export const updateproductreducer=createReducer(updateproductinitialstate,{
    UPDATE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            isupdated:action.payload.success,

        }
    },
    UPDATE_PRODUCT_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            isupdated:false,
        }
    },
    UPDATE_PRODUCT_RESET:(state,action)=>{
        return{
            loading:false,
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