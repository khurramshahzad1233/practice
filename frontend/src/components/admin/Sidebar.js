import React,{Fragment} from 'react'
import "./Sidebar.css"
import {TreeItem,TreeView} from "@material-ui/lab"
import {Add,PostAdd,ListAlt,ImportExport,ExpandMore,Dashboard,People,RateReview} from "@mui/icons-material"
import logo from "../../images/logo.png"
import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <Fragment>
        <div className="home">
            <Link to="/"><img src={logo} alt="commerce" width="80px" /></Link>
            <Link to="/admin/dashboard"><p><Dashboard/> Dashboard</p></Link>

        </div>
        <TreeView
        defaultCollapseIcon={<ExpandMore/>}
        defaultExpandIcon={<ImportExport/>}
        >
            <TreeItem nodeId="1" label="Products" >
                <Link to="/admin/products">
                    <TreeItem nodeId="2" label="All" icon={<PostAdd/>}/>
                    </Link>
                <Link to="/admin/product/new">
                    <TreeItem nodeId="3" label="Create" icon={<Add/>}/>
                    </Link>
                
                
            </TreeItem>
        </TreeView>
        <Link to="/admin/order"><p><ListAlt/></p><p>Orders</p></Link>
        <Link to="/admin/user"><p><People/></p><p>Users</p></Link>
        <Link to="/admin/review"><p><RateReview/></p><p>Review</p></Link>
    </Fragment>
  )
}

export default Sidebar