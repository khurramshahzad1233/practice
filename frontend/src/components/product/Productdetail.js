import React,{Fragment, useEffect,useState} from 'react'
import "./Productdetail.css";
import Carousel from "react-material-ui-carousel";
import {useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { createreviewaction, productdetailaction } from '../../actions/productactions';
import {Rating} from "@mui/material";
import {cartaction} from "../../actions/cartaction.js";
import {Dialog,DialogActions,DialogContent,Button,DialogTitle} from "@material-ui/core"

const Productdetail = () => {

  const {id}=useParams()
  const dispatch=useDispatch();
  const {productdetail}=useSelector((state)=>state.productdetailred)

  const [quantity,setQuantity]=useState(1);
  const [open,setOpen]=useState(false);
  const [comment, setComment]=useState("")
  const [rating,setRating]=useState(0)

  const options={
    size:"large",
    value:productdetail.ratings,
    readOnly:true,
    precesion:0.5
  }



  

  const increasequantity=(e)=>{
    if(productdetail.stock<=quantity)return;
    let qty=quantity+1;
    setQuantity(qty)


  }
  const decreasequantity=(e)=>{
    if(quantity<1)return
    let qty=quantity-1;
    setQuantity(qty)
  }
  const cartsubmithandler=(e)=>{
    dispatch(cartaction(id,quantity))

  };
  const submitreviewtoggle=(e)=>{
    open?setOpen(false):setOpen(true)
    

  };
  const submitreviewhandler=(e)=>{

    const myform=new FormData();
    myform.set("productid",id);
    myform.set("rating",rating);
    myform.set("comment",comment);

    


    dispatch(createreviewaction(myform));
    setOpen(false)

  }



  useEffect(()=>{


    dispatch(productdetailaction(id))


  },[dispatch,id]);
  
  


  return (
    <Fragment>
      <div className="productdetail">
        <div className="carousel">
          <Carousel>{productdetail.image &&
          productdetail.image.map((item)=>(<img src={item.url} alt={item._id} className="carouselimage" key={item._id}/>))
          }</Carousel>
        </div>
        <div className="detail">
          <div>{productdetail.name}</div>
          <div>{productdetail._id}</div>
          <div><><Rating  /></> <span>{productdetail.numofreview} Reviews</span></div>
          <div>{productdetail.price} Rupees</div>
          <div className={productdetail.stock<1?"red":"green"}>{productdetail.stock<1?"out of stock":"instock"}</div>
          <div>
            <button onClick={increasequantity}>+</button>
            <input type="number"
            value={quantity}
            readOnly
            required
            
            />
            <button onClick={decreasequantity}>-</button>
          </div>

          <div><button onClick={cartsubmithandler}>ADD TO CART</button></div>

          <div><button onClick={submitreviewtoggle}>submit review</button></div>

          <Dialog
          aria-labelledby='dialog-box'
          open={open}
          onClose={submitreviewtoggle}
          >
            <DialogTitle>submit review box</DialogTitle>
            <DialogContent>
              <textarea
              rows={50}
              cols={50}
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              ></textarea>
              <Rating
             
             size="large"
             onChange={(e)=>setRating(e.target.value)}
             value={rating}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={submitreviewtoggle}>cancel</Button>
              <Button onClick={submitreviewhandler}>submit Review</Button>
            </DialogActions>
          </Dialog>



        </div>
      </div>

    </Fragment>
  )
}

export default Productdetail
