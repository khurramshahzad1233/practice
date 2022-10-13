import React,{Fragment,useState} from 'react'
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import {Dashboard,ListAlt,ShoppingCart,Face,ExitToApp} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logoutaction} from "../../../actions/useraction.js"
import { useAlert } from 'react-alert';

const Useroptions = ({user}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert()

    
    const [open,setOpen]=useState(false)

    const options=[
        {icon:<ListAlt/>,name:"order",func:order},
        {icon:<Face/>,name:"profile",func:account},
        {icon:<ShoppingCart/>,name:`cart` ,func:cart},
        {icon:<ExitToApp/>,name:"logout",func:logoutuser}
    ];
    if(user.role==="admin"){
        options.unshift({icon:<Dashboard/>,name:"dashboard",func:dashboard})
    };

    function dashboard(){
        navigate("/admin/dashboard")


    };
    function order(){
        navigate("/order")
    };
    function account(){
        navigate("/account")
    };
    function cart(){
        navigate("/cart")
    };
    function logoutuser(){
        dispatch(logoutaction());
        alert.success("logout successfully")
    }
  return (
    <Fragment>
        <SpeedDial
        ariaLabel='speed-dial-options'
        open={open}
        onOpen={(e)=>setOpen(true)}
        onClose={(e)=>setOpen(false)}
        icon={<img src={user.avatar.url?user.avatar.url:"/profile.png"} alt="profile"/>}
        >
            {options.map((item)=>(
                <SpeedDialAction
                icon={item.icon} tooltipTitle={item.name} key={item.name} onClick={item.func}
                />
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default Useroptions