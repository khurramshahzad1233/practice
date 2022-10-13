import React,{Fragment,useEffect,useState} from 'react'
import "./Newproduct.css"
import Metadata from "../layout/Metadata.js"
import {newproductaction,clearerror} from "../../actions/productactions.js"
import {useDispatch, useSelector} from "react-redux"
import {Button,Typography} from "@mui/material";
import {useAlert} from "react-alert"
import Sidebar from "./Sidebar.js"
import { AccountTree, AttachMoney, Description, Spellcheck,Storage } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'



const Newproduct = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()

    const {loading,error,success} =useSelector((state)=>state.newproductred)

    const categories=[
        "laptop","mobilePhones","Garments","tops","electronics"
    ]

    const [name,setName]=useState("")
    const [price,setPrice]=useState(0)
    const [description,setDescription]=useState("")
    const [stock,setStock]=useState(0)
    const [category,setCategory]=useState("")
    const [imagepreview,setImagepreview]=useState([])
    const [image,setImage]=useState([])

    const createproductimage=(e)=>{
        const files=Array.from(e.target.files);
        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if (reader.readyState===2){
                    setImage((old)=>[...old,reader.result]);
                    setImagepreview((old)=>[...old,reader.result]);
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const newproductsubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();
        myform.set("name",name);
        myform.set("price",price);
        myform.set("description",description)
        myform.set("stock",stock)
        myform.set("category",category);
        image.forEach((img)=>{
            myform.append("image",img)
        });
        dispatch(newproductaction(myform))

    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        if(success){
            alert.success("new product successfuly");
            navigate("/admin/dashboard")
            dispatch({type:"NEW_PRODUCT_RESET"})
            
        }

        
    },[dispatch,alert,error,success,navigate])
  return (
    <Fragment>
        <Metadata title={`Create Product`}/>
        <Sidebar/>
        <div className="newproductcontainer">
            <form
            encType='multipart/formdata'
            onSubmit={newproductsubmithandler}
            >
                <Typography>Create Product</Typography>
                <Spellcheck/>
                <input type="text"
                required
                placeholder='product name'
                value={name}
                onChange={(e)=>setName(e.target.value) }
                />
                <AttachMoney/>
                <input type="number"
                required
                placeholder='plz enter product price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
                <Description/>
                <textarea
                required
                placeholder='plz enter product description'
                rows={30}
                cols={30}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
                <Storage/>
                <input type="number"
                required
                placeholder='stock'
                value={stock}
                onChange={(e)=>setStock(e.target.value)}
                />
                <AccountTree/>
                <select onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.map((category)=>(
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>

                <input type="file"
                name='avatar'
                accept='image/*'
                multiple
                onChange={createproductimage}
                />
                <div>
                    {imagepreview.map((image,index)=>(
                        <img src={image} key={index} alt="preview"/>
                    ))}
                </div>
                <Button
                type="submit"
                > Create</Button>

            </form>
        </div>


    </Fragment>
  )
}

export default Newproduct