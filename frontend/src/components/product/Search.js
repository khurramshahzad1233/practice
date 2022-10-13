import React,{Fragment,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Search.css"
import Metadata from '../layout/Metadata'


const Search = () => {
    const navigate=useNavigate()

    const [keyword,setKeyword]=useState("")
    const formsubmithandler=(e)=>{
        e.preventDefault();

        if (keyword.trim()) {

            navigate(`/products/${keyword}`)
            
        } else {
            navigate(`/products`)
            
        }

    }
  return (
    
    <Fragment>
        <Metadata title={"search page"}/>
        <div>
            <form
            onSubmit={formsubmithandler}
            >
                <input type="text"
                
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}
                placeholder="plz search here"
                />
                <input type="submit" value="submitform" />
            </form>
        </div>
    </Fragment>
  )
}

export default Search