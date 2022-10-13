import React,{Fragment,useState,useEffect} from 'react'
import Metadata from "../layout/Metadata"
import Sidebar from "./Sidebar"
import { Typography } from '@material-ui/core';
import {AttachMoney, Spellcheck,Storage} from "@mui/icons-material"
import {Button} from "@mui/material";
import { useParams,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import { productdetailaction,clearerror,updateproductaction } from '../../actions/productactions';
import {useAlert} from "react-alert"


const Updateproduct = () => {
    const {id}=useParams();
    const alert=useAlert()
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const {productdetail,error}=useSelector((state)=>state.productdetailred)
    const {error:updateError,isupdated} =useSelector((state)=>state.updateproductred)

    useEffect(()=>{
        if(productdetail && productdetail._id!==id){
            dispatch(productdetailaction(id))
        }else{
            setName(productdetail.name);
            setPrice(productdetail.price);
            setDescription(productdetail.description);
            setStock(productdetail.stock);
            setCategory(productdetail.category);
            setOldimage(productdetail.image)
        };
        if(error){
            alert.error(error);
            dispatch(clearerror())
        };
        if(updateError){
            alert.error(updateError);
            dispatch(clearerror())
        };
        if(isupdated){
            alert.success("updated successfully")
            navigate(`/admin/dashboard`);
            dispatch({type:"UPDATE_PRODUCT_RESET"})

        }
    },[id,dispatch,productdetail,error,updateError,navigate,alert,isupdated,])


    const [name,setName]=useState("")
    const [price,setPrice]=useState(0)
    const [description,setDescription]=useState("")
    const [stock,setStock]=useState(0)
    const [category,setCategory]=useState("")
    const [image,setImage]=useState([])
    const [imagepreview,setImagepreview]=useState([])
    const [oldimage,setOldimage]=useState([])

    const categories=[
        "mobile",
        "electronics",
        "cameras",
        "garments",
        "hardware"
    ];

    const updateproductimage=(e)=>{
        const files=Array.from(e.target.files);
        // setImage([])
        // setImagepreview([])
        // setOldimage([])

        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImage((old)=>[...old,reader.result])
                    setImagepreview((old)=>[...old,reader.result])
                }
            };
            reader.readAsDataURL(file);
        })

    }
   
    


    const updatesubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.set("name",name)
        myform.set("price",price);
        myform.set("description",description);
        myform.set("stock",stock);
        myform.set("category",category);

        image.forEach((img)=>{
            myform.append("image",img)
        });
        dispatch(updateproductaction(id,myform))
    }
  return (
    
    <Fragment>
        <Metadata title={`update product`}/>
        <Sidebar/>
        <div className="updateform">
            <form
            encType='multipart/form-data'
            onSubmit={updatesubmithandler}
            >
                <Typography>Update Product Form</Typography>
                <Spellcheck/>
                <input type="text"
                required
                placeholder='productname'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                
                />
                <AttachMoney/>
                <input type="number"
                required
                placeholder='price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
                <textarea
                required
                value={description}
                onChange={(e)=>setDescription(e.target.description)}
                rows={20}
                cols={20}
                ></textarea>
                <Storage/>
                <input type="number"
                required
                placeholder='stock'
                value={stock}
                onChange={(e)=>setStock(e.target.value)}
                />
                <select 
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value="">Choose Category</option>
                    {categories.map((category)=>(
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>
                <input type="file"
                accept='image/*'
                name='avatar'
                multiple
                onChange={updateproductimage}
                />
                <div>
                    {oldimage && oldimage.map((image,index)=>(
                        <img src={image.url} key={index} alt="oldimages"/>
                    ))}
                </div>
                <div>
                    {imagepreview && imagepreview.map((image,index)=>(
                        <img src={image} alt="preview" key={index}/>
                    ))}
                </div>
                <Button
                type='submit'
                >Update</Button>


            </form>
        </div>

    </Fragment>
  )
}

export default Updateproduct