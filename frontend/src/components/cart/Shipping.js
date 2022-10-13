import React,{Fragment,useState} from 'react';
import "./Shipping.css"
import Metadata from "../layout/Metadata.js"
import { useSelector,useDispatch } from 'react-redux';
import {Home,LocationCity,PinDrop,Phone,Public,TransferWithinAStation} from "@mui/icons-material"
import {State,Country} from "country-state-city"
import { saveshippinginfo } from '../../actions/cartaction';
import {useNavigate} from "react-router-dom"
import Checkoutstep from './Checkoutstep';

const Shipping = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    
    const {shippinginfo} =useSelector((state)=>state.cartred)
    const [address,setAddress]=useState(shippinginfo.address);
    const [city,setCity]=useState(shippinginfo.city)
    const [pincode,setPincode]=useState(shippinginfo.pincode)
    const [phoneno,setPhoneno]=useState(shippinginfo.phoneno)
    const [country,setCountry]=useState(shippinginfo.country);
    const [state,setState]=useState(shippinginfo.state)



    const shippingsubmithandler=(e)=>{
        e.preventDefault();
        if(phoneno.length>10||phoneno.length<10)return;
        dispatch(saveshippinginfo({address,city,state,country,pincode,phoneno}))

        navigate("/order/confirm") 
        

    }
  return (
    <Fragment>
        <Metadata title={`shipping page`}/>
        <Checkoutstep activestep={0}/>
        <div className="shippingcontainer">
            <div className="shippingbox">
                <form
                onSubmit={shippingsubmithandler}
                encType="multiple/formdata"
                >
                    <Home/>
                    <input type="text"
                    required
                    placeholder='address here plz'
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                    <div>
                        <LocationCity/>
                        <input type="text"
                        required
                        placeholder='plz add city'
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <PinDrop/>
                        <input type="number"
                        required
                        placeholder='plz enter your pincode'
                        value={pincode}
                        onChange={(e)=>setPincode(e.target.value)}

                        />
                    </div>
                    <div>
                        <Phone/>
                        <input type="number"
                        required
                        placeholder='plz enter phone no'
                        value={phoneno}
                        onChange={(e)=>setPhoneno(e.target.value)}
                        size="10"
                        />
                    </div>
                    <div>
                        <Public/>
                        <select
                        required
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {Country && Country.getAllCountries().map((item)=>(
                                <option value={item.isoCode} key={item.isoCode} >{item.name}</option>
                            ))}

                        </select>
                    </div>

                    {country && (
                        <div>
                             <TransferWithinAStation/>
                            <select 
                            required
                            value={state}
                            onChange={(e)=>setState(e.target.value)}
                            >
                                <option value="">state</option>
                                {State && 
                                State.getStatesOfCountry(country).map((item)=>(
                                    <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                ))
                                }
                            </select>
                        </div>
                           
                        )
                    }
                    <input type="submit" value="Continue" disabled={state?false:true} />
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default Shipping