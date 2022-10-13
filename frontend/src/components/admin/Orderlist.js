import React,{Fragment, useEffect} from 'react';
import "./Orderlist.css"
import Metadata from "../layout/Metadata.js"
import {DataGrid} from "@mui/x-data-grid"
import { Typography } from '@mui/material';
import Sidebar from "./Sidebar.js"
import { Link,useNavigate } from 'react-router-dom';
import {Edit,Delete} from "@mui/icons-material"
import { useDispatch,useSelector } from 'react-redux';
import { alladminorderaction,clearerror, orderdeleteaction } from '../../actions/orderaction';
import { useAlert } from 'react-alert';


const Orderlist = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert()

    const {alladminorder,error} =useSelector((state)=>state.alladminorderred)
    const {error:deleteerror,isdeleted}=useSelector((state)=>state.deleteorderred)

    const deleteorder=(id)=>{
        dispatch(orderdeleteaction(id))

    }


    const columns=[
        {
            field:"id",
            headerName:"order id",
            minWidth:150,
            flex:0.5,

        },{
            field:"quantity",
            headerName:"Order Quantity",
            minWidth:200,
            flex:0.5,
        },{
            field:"amount",
            headerName:"Amount",
            minWidth:200,
            flex:1,
            type:"number"
        },{
            field:"status",
            headerName:"Order Status",
            flex:1,
            minWidth:200,
            cellClassName:(params)=>{
                return ((params.row.status)==="delivered"?"green":"color")
            }
        },{
            field:"action",
            headerName:"Action",
            flex:1,
            minWidth:200,
            type:"number",
            renderCell:(params)=>{
                return(
                    <Fragment>
                        
                        <Link to={`/admin/order/${(params.row.id)}`}><Edit/></Link>
                        <button onClick={(e)=>deleteorder((params.row.id))}><Delete/></button>

                </Fragment>
                )
                
            }
        }



    ];
    const rows=[];
    alladminorder && alladminorder.forEach((order)=>{
        rows.push({
            id:order._id,
            quantity:order.orderitem.length,
            amount:order.itemprice,
            status:order.orderstatus
        })
    });

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())

        }
        if(deleteerror){
            alert.error(deleteerror);
            dispatch(clearerror())
        };
        if(isdeleted){
            alert.success("deleted successfully");
            navigate(`/admin/dashboard`);
            dispatch({type:"DELETE_ORDER_RESET"})
        }

        dispatch(alladminorderaction())
    },[alert,dispatch,error,deleteerror,navigate,isdeleted,])
  return (
    <Fragment>
        <Metadata title={`order list`}/>
        <Sidebar/>
        <div className="orderlist">

            <Typography>Order List</Typography>
            <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            autoHeight
            disableSelectionOnClick

            />

        </div>

    </Fragment>
  )
}

export default Orderlist