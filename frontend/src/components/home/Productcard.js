import React,{Fragment} from 'react'
import "./Home.css"
import {Link} from "react-router-dom";
import {Rating} from "@mui/material"

const Productcard = ({product}) => {

    const options={
        value:product.ratings,
        readOnly:true,
        precesion:0.5,
        size:"large"
    }
  return (
    <Fragment>
        <Link to={`/product/${product._id}`} className="productlink">
            <div><img src={product.image[0].url} alt={product.name} className="productimage"/></div>
            <div>{product.name}</div>
            <div><Rating {...options}/> <span>`${product.numofreview} Reviews`</span></div>
            <div>`${product.price} Rupees`</div>

        </Link>

    </Fragment>
  )
}

export default Productcard