import React, { Component } from 'react';
import axios from "axios";
class UpdateAcc extends React.Component {
      state = {
        errors:{},
            customer: {
              name: "",
              mobileNo: "",
              password: "",
            },
          };
          componentDidMount() {
                axios
                  .get(`http://localhost:8080/api/getCustomerbyId/${this.props.match.params.cid}`)
                  .then((res) => {
                    const customer = { ...this.state.customer };
                    customer.name = res.data.name;
                    customer.mobileNo = res.data.mobileNo;
                    customer.password = res.data.password;
                    console.log(res.data);
                    console.log(customer);
                    this.setState({ customer: customer });
                  })
                  .catch((err) => console.log(err));
              }

            handleChange = (event) => {
                    const customer = { ...this.state.customer };
                    customer[event.target.name] = event.target.value;
                    console.log(event.target.name);
                    console.log(event.target.value);
                    this.setState({ customer: customer});
                  };
                handleSubmit = (event) => {
                        event.preventDefault();
                    let errors=this.validateAll();
                    if(this.isValid(errors)){
                        console.log("handleSubmit");
                        const customer = {
                          cid: this.props.match.params.cid,
                          name: this.state.customer.name,
                          mobileNo: this.state.customer.mobileNo,
                          password: this.state.customer.password
                        };
                        axios
                          .put("http://localhost:8080/api/updateAccount",customer)
                          .then((res) => {
                            this.props.history.push("/getCustomerbyId/:cid");
                          })
                          .catch((err) => console.log(err));
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
                       let{name,mobileNo,password}=this.state.customer;
                       let errors={};
                       errors.name=this.validateName(name);
                       errors.mobileNo=this.validateName(mobileNo); 
                       errors.password=this.validateName(password); 
               
                       if (!name) errors.name="names must be entered";
                       if(!mobileNo) errors.mobileNo="enter your mobile number";
                       if(!password) errors.password="enter the password";
                       return errors;
                     };
                     validateName=(name)=>
                       !name ? "name must be entered" : name.length<5 ? " min 5 character" : "";
               
                       validateName=(mobileNo)=>
                       !mobileNo ? "number must be entered" :mobileNo.length=10 ? " contain 10 digits" : "";
               
                       validateName=(password)=>
                       !password ? "password must be entered" : password.length<4 ? " min 4 character" : "";
    render() { 
        let {name,mobileNo,password}=this.state.customer;
        let {errors}=this.state;
        return (
        <div>
 <figure class="text-center">
  <blockquote class="blockquote">
    <h3>Update Here</h3>
  </blockquote>
  </figure>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
             <h5>Customer Name</h5> 
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.customer.name}
              name="name"
              onChange={this.handleChange}
            />
 {errors.name ? <span className="text-danger">{errors.name}</span>:""}
          </div>
          <div className="mb-3">
            <label for="exampleInputTech" className="form-label">
              <h5>Mobile</h5>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputMobileNo"
              aria-describedby="emailHelp"
              value={this.state.customer.mobileNo}
              name="mobileNo"
              onChange={this.handleChange}
            />
{errors.mobileNo ? <span className="text-danger">{errors.mobileNo}</span>:""}
          </div>
          <div className="mb-3">
            <label for="exampleInputTech" className="form-label">
              <h5>Password</h5>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword"
              aria-describedby="emailHelp"
              value={this.state.customer.password}
              name="password"
              onChange={this.handleChange}
            />
   {errors.password ? <span className="text-danger">{errors.password}</span>:""}
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-secondary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
 
export default UpdateAcc;