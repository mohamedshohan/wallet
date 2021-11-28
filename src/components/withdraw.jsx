import React, { Component } from 'react';
import axios from "axios";
class Withdraw extends React.Component {

    state = {
      errors:{},
        customer: {
            amount:"",
          mobileNo: "",
          balance: ""
        },
      };
      handleChange = (event) => {
        const customer = { ...this.state.customer };
        customer[event.target.name] = event.target.value;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ customer: customer });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        let errors=this.validateAll();
        if(this.isValid(errors)){
        console.log("handleSubmit");
        const customer = {
        mobileNo: this.state.customer.mobileNo,
        amount: this.state.customer.amount
        };
        axios
          .put(
            `http://localhost:8080/api/withdrawMoney/${this.state.customer.mobileNo}/${this.state.customer.amount}`
          )
          .then((responce) => {
            this.setState({ customer: responce.data });
          })
          .catch((error) => console.log(error));
      }
      else{
        let s1={...this.state};
         s1.errors=errors;
         this.setState(s1);
       }
     };

     isValid=(errors)=>{
       let keys=Object.keys(errors);
       let count=keys.reduce((acc,curr)=>errors[curr]? acc+1:acc,0);
       return count===0;
     }
     isFormValid=()=>{
       let errors=this.validateAll();
       return this.isValid(errors);
     }
     validateAll=()=>{
       let{mobileNo,amount}=this.state.customer;
       let errors={};
       errors.mobileNo=this.validateName(mobileNo); 
      //  errors.amount=this.validateName(amount); 

       if(!mobileNo) errors.mobileNo="Enter Your Mobile Number";
       if(!amount) errors.amount="Enter The Amount";
       return errors;
     };
     validateName=(mobileNo)=>
       !mobileNo ? "Number Must Be Entered" : mobileNo.length<10 ? " Must Contain 10 Character" : "";

      //  validateName=(amount)=>
      //  !amount ? "Amount Must Be Entered" :amount.length<2 ? "Amount Should Be Greater Than Rs.10" : "";
    render() { 
      let {mobileNo,amount}=this.state.customer;
      let {errors}=this.state;
        return (
            <div>
            <figure className="text-center">
              <blockquote className="blockquote">
                <h3>Enter your Mobile Number</h3>
              </blockquote>
            </figure>
    
            <form className="w-50 mx-auto border p-3" onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label for="exampleInputMobileNo" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="mobileNo"
                  value={this.state.customer.mobileNo}
                  onChange={this.handleChange}
                />
                 {errors.mobileNo ? <span className="text-danger">{errors.mobileNo}</span>:""}
              </div>
              <div className="mb-3">
                <label for="exampleInputAmount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="amount"
                  value={this.state.customer.amount}
                  onChange={this.handleChange}
                />
                 {errors.amount ? <span className="text-danger">{errors.amount}</span>:""}
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-secondary me-2"
              />
            </form>
            <table  className=" table table-striped border-dark border w-75 mx-auto padding">
              <thead>
                <tr>
                  <th> MY BALANCE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                     <td>{this.state.customer.balance}</td> 
                  
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }

export default Withdraw;