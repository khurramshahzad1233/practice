import {configureStore} from "@reduxjs/toolkit"
import { cartreducer } from "./reducer/cartreducers.js";
import { alladminorderreducer, deleteorderreducer, myorderreducer, orderdetailreducer, orderreducer, orderstatusreducer } from "./reducer/orderreducer.js";
import { alladminproductreducer, allproductreducer, createreviewreducer, deleteproductreducer, newproductreducer, productdetailreducer, updateproductreducer } from "./reducer/productreducer";
import { alladminuserreducer, deleteuserreducer, userdetailreducer, userreducer, userrolereducer } from "./reducer/userreducer";
const store=configureStore({
    reducer:{
        allproductred:allproductreducer,
        userred:userreducer,
        productdetailred:productdetailreducer,
        cartred:cartreducer,
        createreviewred:createreviewreducer,
        orderred:orderreducer,
        myorderred:myorderreducer,
        orderdetailred:orderdetailreducer,
        alladminuserred:alladminuserreducer,
        alladminproductred:alladminproductreducer,
        alladminorderred:alladminorderreducer,
        newproductred:newproductreducer,
        deleteproductred:deleteproductreducer,
        updateproductred:updateproductreducer,
        deleteorderred:deleteorderreducer,
        orderstatusred:orderstatusreducer,
        deleteuserred:deleteuserreducer,
        userrolered:userrolereducer,
        userdetailred:userdetailreducer,
        
        

    }
});
export default store;