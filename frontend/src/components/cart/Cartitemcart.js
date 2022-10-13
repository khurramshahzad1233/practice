import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';

const Cartitemcart = ({item,deletecartitems }) => {
  return (
    <Fragment>
        <Link to={`/product/${item.product}`}><img src={item.image} alt="product" className='productimages'/></Link>
        <span>{item.price}</span><span>item.name</span>
        <p onClick={(e)=>deletecartitems(item.product)}>Remove</p>


    </Fragment>
  )
}

export default Cartitemcart