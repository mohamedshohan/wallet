import React, { Component } from 'react';
import{Link} from "react-router-dom"
import Navbar from './navbar';

class Home extends React.Component {
    render() { 
        return <div>
            <Navbar/>
      <Link
          to="/getCustomerbyId/:cid"
          className="btn btn-secondary btn-large mb-2 mt-2 "
        >
          Your Account
        </Link>
        </div>;
    }
}
 
export default Home;