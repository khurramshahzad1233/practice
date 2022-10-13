import React,{Fragment,useEffect} from 'react';
import "./Myorder.css"
import Metadata from '../layout/Metadata';
import {useDispatch,useSelector} from "react-redux";
import {myorderaction,clearerror} from "../../actions/orderaction.js"
import { useAlert } from 'react-alert';
import {DataGrid} from "@mui/x-data-grid"
import { Link } from 'react-router-dom';
import {Launch} from "@mui/icons-material"


const Myorder = () => {
    const dispatch=useDispatch();
    const alert=useAlert()

    const {order,error,loading}=useSelector((state)=>state.myorderred)
    const {user}=useSelector((state)=>state.userred)

    const columns=[
        {
            field:"id",
            headerName:"order id",
            minWidth:300,
            flex:1,

        },{
            field:"itemquantity",
            headerName:"item quantity",
            minWidth:300,
            flex:1,
        },{
            field:"amount",
            headerName:"Amount",
            minWidth:300,
            flex:1,
        },{
            field:"status",
            headerName:"Status",
            minWidth:300,
            flex:1,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="delivered"?"greencolor":"redcolor"
                
            }
        },{
            field:"action",
            headerName:"Action",
            minWidth:200,
            flex:1,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Link to={`/order/${params.getValue(params.id,"id")}`}><Launch/></Link>

                )
            }
        }

    ];
    const rows=[];
    
        order && order.forEach((item,index)=>{
            rows.push({
                id:item._id,
                itemquantity:item.orderitem.length,
                amount:item.totalprice,
                status:item.orderstatus,

            })
        })
    




    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())

        }

        dispatch(myorderaction())
    },[dispatch,alert,error])
  return (
    <Fragment>
        <Metadata title={`my orders`}/>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        />
    </Fragment>
  )
}

export default Myorder