import React,{Fragment,useEffect} from 'react';
import "./Productlist.css"
import Metadata from "../layout/Metadata.js"
import {alladminproductaction,clearerror, deleteproductaction} from "../../actions/productactions"
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from "react-alert";
import {DataGrid} from "@mui/x-data-grid";
import {Link,useNavigate} from "react-router-dom"
import {Delete, Edit} from "@mui/icons-material"
import {Button} from "@mui/material"

const Productlist = () => {
  const dispatch=useDispatch();
  const alert=useAlert()
  const navigate=useNavigate()

  const {alladminproduct,error}=useSelector((state)=>state.alladminproductred);
  const {isdeleted,error:deleteerror}=useSelector((state)=>state.deleteproductred)


  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    };
    if(deleteerror){
      alert.error(deleteerror)
      dispatch(clearerror())
    };
    if(isdeleted){
      alert.success("deleted successfully")
      navigate(`/admin/dashboard`)
      dispatch({type:"DELETE_PRODUCT_RESET"})

    }

    dispatch(alladminproductaction())
  },[dispatch,alert,error,deleteerror,isdeleted,navigate,]);

  const deleteproducthandler=(id)=>{
    dispatch(deleteproductaction(id))
  }

  const columns=[
    {
      field:"id",
      headerName:"Product Id",
      minWidth:50,
      flex:0.3
    },{
      field:"name",
      headerName:"Name",
      minWidth:100,
      flex:0.3
    },{
      field:"stock",
      headerName:"Stock",
      minWidth:10,
      flex:0.3,
      type:"number"
    },{
      field:"price",
      headerName:"Price",
      minWidth:10,
      flex:0.3,
      type:"number"
    },{
      field:"action",
      headerName:"Action",
      minWidth:50,
      flex:0.5,
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return(
          <Fragment>

            <Link to={`/admin/product/${params.getValue(params.id,"id")}`}><Edit/></Link>
            <Button onClick={(e)=>deleteproducthandler(params.getValue(params.id,"id"))}><Delete/></Button>
          </Fragment>
         


        )
      }

    }
  ];
  let rows=[];
  alladminproduct && alladminproduct.forEach((product)=>{
    rows.push({
      id:product._id,
      name:product.name,
      price:product.price,
      stock:product.stock
    })
  })

  return (
    <Fragment>
      <Metadata title={`Product list`}/>

      <div className="allproducts">
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        />

      </div>
    </Fragment>
  )
}

export default Productlist