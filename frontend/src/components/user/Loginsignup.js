import React,{Fragment,useEffect,useRef,useState} from 'react';
import "./Loginsignup.css";
import {MailOutline,LockOpen,Face} from "@mui/icons-material";
import {useLocation,useNavigate } from 'react-router-dom';
import {clearerror, registeruseraction,loginaction} from "../../actions/useraction.js"
import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert';

const Loginsignup = () => {
    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()

    const switchertab=useRef(null);
    const logintab=useRef(null);
    const registertab=useRef(null);

    const[loginemail,setLoginemail]=useState("");
    const[loginpassword,setLoginpassword]=useState("");

    const[user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password}=user;

    const[avatar,setAvatar]=useState("")
    const [avatarpreview,setAvatarpreview]=useState('/profile.png')
    const {isAuthenticated,loading,error}=useSelector((state)=>state.userred)



    const loginsubmithandler=(e)=>{
        e.preventDefault();
        dispatch(loginaction(loginemail,loginpassword));
    }

    const registersubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.set("name",name)
        myform.set("email",email)
        myform.set("password",password)
        myform.set("avatar",avatar)

        dispatch(registeruseraction(myform))

       
    };

    const redirect=location.search?location.search.split("=")[1]:"/account"

    const registerhandler=(e)=>{
        if (e.target.name==="avatar") {
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatar(reader.result)
                    setAvatarpreview(reader.result)

                }
            }
            reader.readAsDataURL(e.target.files[0])
            
        } else {
            setUser({...user,[e.target.name]:e.target.value})
            
        }

    }




    const switchtab=(tab)=>{
        if(tab==="login"){
            switchertab.current.classList.remove("shifttoright")
            switchertab.current.classList.add("shifttoneutral")

            logintab.current.classList.remove("shifttoleft")
            registertab.current.classList.remove("neutralform")
        };
        if(tab==="register"){
            switchertab.current.classList.add("shifttoright")
            switchertab.current.classList.remove("shifttoneutral");

            registertab.current.classList.add("neutralform")
            logintab.current.classList.add("shifttoleft")
        }
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }

        if(isAuthenticated){
            navigate(redirect)
        }
    },[isAuthenticated,navigate,redirect,dispatch,error,alert])
  return (
    <Fragment>
        <div className="loginsignupcontainer">
            <div className="loginsignupbox">
                <div className="loginsignuptoggle">
                    <p onClick={(e)=>switchtab("login")}>Login</p>
                    <p onClick={(e)=>switchtab("register")}>Register</p>
                    
                </div>
                <div ><button ref={switchertab} className="togglebtn"></button></div>

                <form
                onSubmit={loginsubmithandler}
                ref={logintab}
                className="loginform"
                >
                    <div>
                        <MailOutline/>

                    <input type="email"
                    required
                    placeholder='plz enter your email'
                    value={loginemail}
                    onChange={(e)=>setLoginemail(e.target.value)}
                    />
                    </div>
                    <div>
                        <LockOpen/>
                        <input type="password"
                        required
                        placeholder='plz enter loginpassword'
                        value={loginpassword}
                        onChange={(e)=>setLoginpassword(e.target.value)}
                        />

                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>

                    


                </form>

                <form
                encType='multipart/form-data'
                onSubmit={registersubmithandler}
                ref={registertab}
                className="registerform"
                >

                    <div>
                        <Face/>
                        <input type="text"
                        required
                        placeholder='plz enter name'
                        value={name}
                        name="name"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <MailOutline/>
                        <input type="email"
                        required
                        placeholder='enter your email'
                        value={email}
                        name="email"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <LockOpen/>
                        <input type="password"
                        required
                        placeholder='enter password plz'
                        value={password}
                        name="password"
                        onChange={registerhandler}

                        />
                    </div>
                    <div>
                        <img src={avatarpreview} alt="avatar preview" width="30px"/>
                        <input type="file"
                        required
                        name="avatar"
                        accept="image/*"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default Loginsignup