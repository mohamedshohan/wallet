import React from "react";
import { NavLink } from "react-router-dom";



function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">Wallet</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </NavLink>
              </li>
              <li className="nav-item">
              <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/createAcc"
                  >
                    Create Account
                  </NavLink>
              </li>
              <li className="nav-item">
              <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/getCustomerbyId/:cid"
                  >
                    My Account
                  </NavLink>
              </li>
             
             
              
              <li className="nav-item dropdown">
              <NavLink
                    className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    aria-current="page"
                    to="/"
                  >
                    Actions
                  </NavLink>
                <ul className="dropdown-menu"  aria-labelledby="dropdownMenuButton1">
                <li className="dropdown-item">
              <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/showBalance/:mobileNo"
                  >
                    Balance
                  </NavLink>
              </li>
                <li className="dropdown-item">
              <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/makeDeposit/:mobileNo/:amount"
                  >
                    Deposite Amount
                  </NavLink>
              </li>
                
              <li className="dropdown-item">
              <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/withdrawMoney/:mobileNo/:amount"
                  >
                    Withdraw Amount
                  </NavLink>
              </li>
              <li className="dropdown-item">
              <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/transferMoney/:sourcemobileNo/:targetMobileNo/:amount"
                  >
                    Fund Transfer
                  </NavLink>
              </li>
                </ul>
              </li>

              <li className="nav-item">
              <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
              </li>
            </ul>
            <form className="d-flex ms-auto">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
          </div>
        </div>
      </nav>

    )
}
export default Navbar;