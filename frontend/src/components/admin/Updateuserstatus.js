import React,{Fragment,useEffect,useState} from 'react'
import "./Updateuserstatus.css"
import Metadata from "../layout/Metadata.js"
import {userdetailaction,userroleaction,clearerror} from "../../actions/useraction.js"
import {useSelector,useDispatch} from "react-redux"
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {Mail,Face,VerifiedUser} from "@mui/icons-material"
import {Button} from "@mui/material";
import {useAlert } from "react-alert"


const Updateuserstatus = () => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const alert=useAlert()

    const {user,error}=useSelector((state)=>state.userdetailred);
    const {isupdated,error:updateerror}=useSelector((state)=>state.userrolered)
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("")

    useEffect(()=>{
        
       
        
        if(user && user._id!==id){
            dispatch(userdetailaction(id))
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            
        };
        if(error){
            alert.error(error);
            dispatch(clearerror())
        };
        if(updateerror){
            alert.error(updateerror)
            dispatch(clearerror())
        };

        if(isupdated){
            alert.success("updated successfully");
            dispatch({type:"UPDATE_ROLE_RESET"})
        }
        

        
    },[dispatch,id,error,updateerror,isupdated,user,alert]);

    const updaterolehandler=(e)=>{
        e.preventDefault()
        const myform=new FormData();
        myform.set("email",email);
        myform.set("name",name);
        myform.set("role",role);

        dispatch(userroleaction(id,myform))
    }


  return (
    <Fragment>
        <Metadata title={`update user`}/>

        <form
        onSubmit={updaterolehandler}
        >
            <Typography>Update Role </Typography>
            <div>
                <Mail/>
                <input type="email"
                required
                placeholder='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
                <Face/>
                <input type="text"
                required
                placeholder='name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div>
                <VerifiedUser/>
                <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                >
                    <option value="">Choose Role</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                </select>

            </div>
            <div>
                <Button type='submit'>update</Button>
            </div>


        </form>
    </Fragment>
  )
}

export default Updateuserstatus