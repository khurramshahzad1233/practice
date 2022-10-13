import React,{Fragment,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import Loader from '../layout/loader/Loader'
const Profile = () => {
    
    const navigate=useNavigate()

    const {loading,isAuthenticated,user}=useSelector((state)=>state.userred)

    useEffect(()=>{
        if(isAuthenticated===false){
            navigate("/login")


        }
    },[navigate,isAuthenticated])
  return (
    <Fragment>{
        loading?(<Loader/>):( <Fragment>
            <Metadata title={`${user.name} Profile`}/>
            <h2>My Profile</h2>
            {/* <img src={user.avatar.url} alt="profile"/> */}
            <Link to="/me/update">Edit Profile</Link>

            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{String(user.createdAt).substring(0,10)}</div>

            <div>
                <Link to="/order">my order</Link>
                <Link to="/password/update">Change password</Link>
            </div>


    
        </Fragment>)}</Fragment>
   
  )
}

export default Profile