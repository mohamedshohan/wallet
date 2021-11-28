import React, { Component } from 'react';
import axios from "axios";
class FundTransfer extends React.Component {
    state = {
      errors:{},
        customer: {
            amount:"",
            sourceMobileNo: "",
            targetMobileNo:"",
             balance: "",
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
        sourceMobileNo: this.state.customer.sourceMobileNo,
        targetMobileNo: this.state.customer.targetMobileNo,
        amount: this.state.customer.amount,
       
        };
        axios
          .put(
            `http://localhost:8080/api/transferMoney/${this.state.customer.sourceMobileNo}/${this.state.customer.targetMobileNo}/${this.state.customer.amount}`
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
       let{sourceMobileNo,targetMobileNo,amount}=this.state.customer;
       let errors={};
       errors.sourceMobileNo=this.validateName(sourceMobileNo); 
       errors.targetMobileNo=this.validateName(targetMobileNo); 
      //  errors.amount=this.validateName(amount); 

       if(!sourceMobileNo) errors.sourceMobileNo="Enter Your Mobile Number";
       if(!targetMobileNo) errors.targetMobileNo="Enter Target Mobile Number";
       if(!amount) errors.amount="Enter The Amount";
       return errors;
     };
     validateName=(sourceMobileNo)=>
       sourceMobileNo ? "Number Must Be Entered" : sourceMobileNo.length<10 ? " Must Contain 10 Character" : "";

       validateName=(targetMobileNo)=>
       !targetMobileNo ? "Number Must Be Entered" : targetMobileNo.length<10 ? " Must Contain 10 Character" : "";

      //  validateName=(amount)=>
      //  !amount ? "Amount Must Be Entered" :amount.length<2 ? "Amount Should Be Greater Than Rs.10" : "";
    render() { 
      let {sourceMobileNo,targetMobileNo,amount}=this.state.customer;
      let {errors}=this.state;
        return (
            <div>
            <figure className="text-center">
              <blockquote className="blockquote">
                <h3>Complete The Form</h3>
              </blockquote>
            </figure>
    
            <form className="w-50 mx-auto border p-3" onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label for="exampleInputMobileNo" className="form-label">
                  Your Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="sourceMobileNo"
                  value={this.state.customer.sourceMobileNo}
                  onChange={this.handleChange}
                />
                {errors.sourceMobileNo ? <span className="text-danger">{errors.sourceMobileNo}</span>:""}
              </div>
              <div className="mb-3">
                <label for="exampleInputMobileNo" className="form-label">
                  Target Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="targetMobileNo"
                  value={this.state.customer.targetMobileNo}
                  onChange={this.handleChange}
                />
                {errors.targetMobileNo ? <span className="text-danger">{errors.targetMobileNo}</span>:""}
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
            <table className=" table table-striped border-dark border w-75 mx-auto padding">
              <thead>
                <tr>
                  <th> Your Remaining Balance</th>
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
 
export default FundTransfer;