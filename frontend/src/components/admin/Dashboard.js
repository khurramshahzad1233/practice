import React,{Fragment,useEffect} from 'react';

import "./Dashboard.css"
import {getalladminuseraction} from "../../actions/useraction.js"
import {alladminproductaction} from "../../actions/productactions"
import {alladminorderaction} from "../../actions/orderaction.js"
import {useSelector, useDispatch} from "react-redux"
import Metadata from '../layout/Metadata';
import {Link} from "react-router-dom"
import { Typography } from '@mui/material';
import {Doughnut,Line} from "react-chartjs-2";
import {ArcElement, Chart,Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement} from "chart.js"
import Sidebar from './Sidebar.js';
Chart.register(ArcElement,Tooltip,LineElement,Legend,Title,CategoryScale,LinearScale,PointElement)


const Dashboard = () => {

    const dispatch=useDispatch();

    const {alladminuser}=useSelector((state)=>state.alladminuserred)
    const {alladminproduct}=useSelector((state)=>state.alladminproductred)
    const {alladminorder}=useSelector((state)=>state.alladminorderred)




    useEffect(()=>{

        dispatch(getalladminuseraction())
        dispatch(alladminproductaction())
        dispatch(alladminorderaction())
    },[dispatch]);
    let outofstock=0;
    alladminproduct && alladminproduct.forEach((item)=>{
      if(item.stock===0){
        outofstock+=1
      }
    });

    let totalamount=0;
    alladminorder && alladminorder.forEach((item)=>{
      totalamount+=item.totalprice;
    })


    let lineState={
      labels:["initial amount","earned amount"],

      datasets:[
        {
          label:"totalamount",
          data:[0,6000],
          backgroundColor:["tomato"]
        }
      ]
    };
    let doughnutState={
      labels:["Out of Stock", "InStock"],
      datasets:[
        {
          backgroundColor:["#00A6B4","#6800B4"],
          hoverBackgroundColor:["#4B5000","#35014F"],
          data:[outofstock,alladminproduct.length-outofstock],
        },
      ],
    };
  return (
    <Fragment>
        <Metadata title={`Dashboard`}/>
        <Sidebar/>
        <div className="dashboardcontainer">
          <Typography>DashBoard</Typography>
        </div>
        <div className="productsummary">
          <Link to={`/admin/users`}><p>All Users </p><p>{alladminuser && alladminuser.length}</p></Link>
          <Link to={`/admin/products`}><p>All Products </p><p>{alladminproduct && alladminproduct.length}</p></Link>
          <Link to={`/admin/orders`}><p>All Orders {alladminproduct && alladminorder.length}</p></Link>
        </div>
        <div><Line data={lineState}/></div>
        <div><Doughnut data={doughnutState} /></div>
    </Fragment>
  )
}

export default Dashboard