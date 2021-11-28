import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class CusById extends React.Component {


    state = {

        errors:{},
          customer: {
              cid:"",
            name: "",
            mobileNo: "",
            password: "", 
          },
        };

        handleChange= (event) =>{
            const customer={...this.state.customer};//copying student object
            customer[event.target.name]=event.target.value;//student[fullName]="AB"
            //student[rollno]=1;
            
            console.log(event.target.name);
            console.log(event.target.value);
            this.setState({ customer : customer} );
          };

          handleSubmit=(event) =>{
            event.preventDefault();
            let errors=this.validateAll();
            if(this.isValid(errors)){
            console.log("handleSubmit")
            const customer={
                cid:this.state.customer.cid,
              name:this.state.customer.name,
              mobileNo:this.state.customer.mobileNo,
              password:this.state.customer.password
                };
            axios.get(`http://localhost:8080/api/getCustomerbyId/${this.state.customer.cid}`)
            .then((res) =>{
                console.log(res);
                //this.props.history.push("/bankaccount");
                this.setState({customer:res.data});
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
           let{cid}=this.state.customer;
           let errors={};
           errors.cid=this.validateName(cid);
          
   
           if (!cid) errors.name="id must be entered";
         
           return errors;
         };
         validateName=(cid)=>
           !cid ? "id must be entered" : cid.length<1 ? " enter proper id" : "";
   
           
    render() { 
      let {cid}=this.state.customer;
      let {errors}=this.state;
        return <div>
 <figure class="text-center">
  <blockquote class="blockquote">
    <h3>Account</h3>
  </blockquote>
  </figure>
            <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label"><h5>Enter Customer Id</h5></label>
                    <input type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={this.state.customer.cid}
                        name="cid"
                        onChange={this.handleChange}/>
                           {errors.cid ? <span className="text-danger">{errors.cid}</span>:""}

                </div>  
                    <button type="submit" class="btn btn-secondary me-2">Submit</button>

            </form>

            <table className=" table table-striped border-dark border w-75 mx-auto padding">
        
        <thead>
            <tr>
                <th >Customer Id</th>
                <th>Name</th>
               
                <th>Mobile</th>
                 <th>Password</th>
                
                
            </tr>
        </thead>

    <tbody>
      
        <tr>
             <td>{this.state.customer.cid}</td>
            <td>{this.state.customer.name}</td>
           
            <td>{this.state.customer.mobileNo}</td>
            <td>{this.state.customer.password}</td>
            <td>
            <Link
          to={`/updateAccount/${this.state.customer.cid}`}
          className="btn btn-secondary btn-large mb-2 mt-2 "
        >
          Update
        </Link>
            </td>
           
            
            
        </tr>
        
    </tbody>
   
    </table>
   
    
</div>
}
}
export default CusById;