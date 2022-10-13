import React,{Fragment,useEffect} from 'react'
import "./Userlist.css";
import Metadata from "../layout/Metadata.js"
import {getalladminuseraction,clearerror,deleteuseraction} from "../../actions/useraction"
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from "react-alert";
import {DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar.js"
import {Link} from "react-router-dom";
import {Edit,Delete} from "@mui/icons-material"
import {Button} from "@mui/material"

 
const Userlist = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    
    // const {id}=useParams()
    const {alladminuser,loading,error}=useSelector((state)=>state.alladminuserred)
    const {error:deleteerror,isdeleted}=useSelector((state)=>state.deleteuserred)

    const deleteorderhandler=(id)=>{
        dispatch(deleteuseraction(id))
        

    }

    const columns=[
        {
            field:"id",
            headerName:"user id",
            minWidth:150,
            flex:1,
        },{
            field:"email",
            headerName:"email",
            minWidth:150,
            flex:0.5,

        },{
            field:"name",
            headerName:"Name",
            minWidth:200,
            flex:0.8,
        },{
            field:"role",
            headerName:"role",
            minWidth:200,
            flex:1,
            cellClassName:(params)=>{
                return (params.row.role)==="admin"?"color1":"color2"
            }
        },{
            field:"action",
            headerName:"action",
            minWidth:300,
            flex:1,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/user/${(params.row.id)}`}><Edit/></Link>
                        <Button onClick={(e)=>deleteorderhandler((params.row.id))}><Delete/></Button>


                    </Fragment>
                )
            }
        }

    ];
    const rows=[];
    alladminuser && alladminuser.forEach((user)=>{
        rows.push({
            id:user._id,
            email:user.email,
            name:user.name,
            role:user.role,

        })
    })

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        };
        if(isdeleted){
            alert.error(deleteerror);
            dispatch(clearerror())
        };
        if(isdeleted){
            alert.success("deletedsuccessfuly")
            dispatch({type:"DELETE_USER_RESET"})
        }

        dispatch(getalladminuseraction())
    },[dispatch,alert,error,isdeleted,deleteerror])
  return (
    <Fragment>
        <Metadata title={`all orders`}/>
        <Sidebar/>
        <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={10}
        pagination
        disableSelectionOnClick
        />
    </Fragment>
  )
}

export default Userlist