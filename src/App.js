import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Navbar from './components/navbar';
import MobileNo from './components/entermobile';
import CreateAccount from './components/createAccount';
import CusById from './components/customerById';
import UpdateAcc from './components/updateAccount';
import Deposite from './components/deposite';
import Withdraw from './components/withdraw';
import FundTransfer from './components/fundtransfer';
import Login from './components/Login';

import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      {/* <Link
          to="/getCustomerbyId/:cid"
          className="btn btn-secondary  mb-2 mt-2 "
        >
          Your Account
        </Link> */}
    </div>
    <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/createAcc" component={CreateAccount}/>
    <Route path="/showBalance/:mobileNo" component={MobileNo}/>
    <Route path="/getCustomerbyId/:cid" component={CusById}/>
    <Route path="/updateAccount/:cid" component={UpdateAcc}/>
    <Route path="/makeDeposit/:mobileNo/:amount" component={Deposite}/>
    <Route path="/withdrawMoney/:mobileNo/:amount" component={Withdraw}/>
    <Route path="/transferMoney/:sourcemobileNo/:targetMobileNo/:amount" component={FundTransfer}/>
    </Switch>
    </Router>
  );
}

export default App;
