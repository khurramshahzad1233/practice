import React,{Fragment} from 'react'
import {CheckCircle} from "@mui/icons-material"
import { Typography } from '@mui/material'
import {Link} from "react-router-dom"

const Ordersuccess = () => {
  return (
    <Fragment>
        <CheckCircle/>
        <Typography>Your order is palced successfully</Typography>
        <Link to={`/order/me`}>View Order</Link>
        
    </Fragment>
  )
}

export default Ordersuccess