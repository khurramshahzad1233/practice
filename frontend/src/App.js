import React,{useEffect,useState} from 'react';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import Header from "./components/layout/header/Header.js"
import Footer from "./components/layout/footer/Footer.js";
import WebFont from "webfontloader"
import Home from './components/home/Home.js';
import Productdetail from './components/product/Productdetail.js';
import Product from './components/product/Product.js';
import Search from './components/product/Search.js';
import Loginsignup from './components/user/Loginsignup.js';
import {loadaction} from "./actions/useraction.js"
import store from "./store.js"
import { useSelector } from 'react-redux';
import Useroptions from './components/layout/header/Useroptions.js';
import Profile from './components/user/Profile.js';
import Protectedroute from './components/route/Protectedroute.js';
import Cart from './components/cart/Cart.js';
import Shipping from './components/cart/Shipping.js';
import Confirmorder from './components/cart/Confirmorder.js';
import Payment from './components/cart/Payment.js';
import axios from 'axios';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Ordersuccess from "./components/cart/Ordersuccess"
import Myorder from './components/order/Myorder.js';
import Orderdetail from './components/order/Orderdetail.js';
import Dashboard from './components/admin/Dashboard';
import Newproduct from './components/admin/Newproduct.js';
import Productlist from './components/admin/Productlist.js';
import Updateproduct from './components/admin/Updateproduct.js';
import Orderlist from './components/admin/Orderlist.js';
import Processorder from './components/admin/Processorder.js';
import Userlist from './components/admin/Userlist.js';
import Updateuserstatus from './components/admin/Updateuserstatus.js';

const App = () => {

  const [stripeapikey,setStripeapikey]=useState("")
  const {isAuthenticated,user}=useSelector((state)=>state.userred);
  
  async function getstripeapikey(){
    const {data}=await axios.get("/api/stripeapikey");
    setStripeapikey(data.sendapikey)
  };
  const stripePromise=loadStripe(stripeapikey)

             

  useEffect(()=>{


    WebFont.load({google:{
      families:["Roboto","Chilanka","Droid Sans"]
    }})
    store.dispatch(loadaction());
    getstripeapikey();
  },[])
  


  return (
    <Router>
      <Header/>
      {isAuthenticated && <Useroptions user={user}/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Productdetail/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/products/:keyword' element={<Product/>}/>
        <Route path='/login' element={<Loginsignup/>}/>


        <Route element={<Protectedroute/>}>
        <Route path='/account' element={<Profile/>}/>

        </Route>

        <Route path='/cart' element={<Cart/>}/>
        
        <Route element={<Protectedroute/>}>
          <Route path='/login/shipping' element={<Shipping/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/order/confirm' element={<Confirmorder/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/process/payment' element={(<Elements stripe={stripePromise}><Payment/></Elements>)}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/success' element={<Ordersuccess/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/order/me' element={<Myorder/>}/>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route path='/order/:id' element={<Orderdetail/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/product/new' element={<Newproduct/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/products' element={<Productlist/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/product/:id' element={<Updateproduct/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/order' element={<Orderlist/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/order/:id' element={<Processorder/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/user' element={<Userlist/>}/>
        </Route>

        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/user/:id' element={<Updateuserstatus/>}/>
        </Route>



      </Routes>

      <Footer/>
    </Router>
  )
}

export default App