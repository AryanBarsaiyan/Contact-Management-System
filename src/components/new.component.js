import React, { Component } from 'react';
import axios from 'axios';

class Newcontact extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            username: '',
            phonenumber: '',
            email: '',
            image: ''
        }

        this.state = {
            fields: {},
            errors: {}
        }

    }


    componentDidMount() {
        axios.get('http://localhost:8000/existing/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              phonenumber: response.data.phonenumber,
              email: response.data.email,
              image: response.data.image
            })   
          })
          .catch(function (error) {
            console.log(error);
        })
    
    }


    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
   
        //Name
        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+ [a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Enter Firstname and Lastname";
           }        
        }
   
        //Phone Number
      if(typeof fields["phone"] !== "undefined"){
         if(!fields["phone"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
            formIsValid = false;
            errors["phone"] = "Enter Valid Phonenumber";
         }        
      }
    
        //Email
      if(typeof fields["emails"] !== "undefined"){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!fields["emails"].match(re)){
            formIsValid = false;
            errors["emails"] = "Enter Valid Email";
         }        
      }  
      
       //File
       if(typeof fields["image"] !== "undefined"){
        if(!fields["image"].match(/(.png|.jpg|.jpeg)$/i)){
            formIsValid = false;
            errors["image"] = "'.jpeg','.jpg','png' formats are only allowed.";
        }        
    }
   
       this.setState({errors: errors});
       return formIsValid;
   }


   handleChange(field, e) {         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
    }


    onChangeImage(e) {  
        let blob = new Blob([e.target.files[0]], {type: 'image/png'| 'image/jpg' | 'image/jpeg'});
        
        this.setState({
            image: URL.createObjectURL(blob)
        })
    }

    Capitalize(str) {
        var res = str.split(" ");
        var first = res[0].charAt(0).toUpperCase() + res[0].slice(1).toLowerCase();
        var second = res[1].charAt(0).toUpperCase() + res[1].slice(1).toLowerCase();

        return first + " " + second;
      }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    
    onChangePhoneNumber(e) {
        this.setState({
            phonenumber: e.target.value
        })
    }

    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    

    onSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()) {
            const existing = {
                username: this.Capitalize(this.state.username),
                phonenumber: this.state.phonenumber,
                email: this.state.email.toLowerCase(),
                image: this.state.image
            }
        
            console.log(existing);
            if(this.props.match.params.id){
                axios.post('http://localhost:8000/existing/update/' + this.props.match.params.id, existing)
              .then(res => console.log(res.data));
    
            alert('Updated Successfully!!!');
            }
            else{
                axios.post('http://localhost:8000/new/create/',existing)
              .then(res => console.log(res.data));
    
            alert("Form submitted");
            }
            // window.location = '/'; // Here is the drawback of revokeurlobject.....
        }
        else {
            return alert("Form has errors.");
        }
        
    }
    

    render() {
        return (
            <div className = "container">
                <div class="row">
                    <div class="col-4" >
                        <div>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="file" 
                                        ref = "image"
                                        required
                                        disabled = {this.props.disable}
                                        accept=".jpg, .jpeg, .png"
                                        onInput={this.handleChange.bind(this, "image")}
                                        onChange={this.onChangeImage}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["image"]}</span>
                                </div>
                                <img src={this.state.image} style= {{ width: '171px', height: '180px'}}/> 
                            </form>
                        </div>
                        <div style={{ fontFamily: "Georgia", fontSize:18, position: 'fixed', left: '14%', bottom: 200, transform: 'translateX(-10%)' }}>
                            Hello, {this.state.username}
                        </div>
                    </div>
                    <div class="col-8">
                        <h3>CONTACT DETAILS</h3>
                            <form onSubmit={this.onSubmit }>
                                <div className="form-group"> 
                                    <label>Username: </label>
                                    <input  type="text"
                                        required
                                        ref="name"
                                        className="form-control"
                                        placeholder = "eg: Aryan Barsaiyan"
                                        value={this.state.username}
                                        disabled = {this.props.disable}
                                        onInput={this.handleChange.bind(this, "name")} 
                                        onChange={this.onChangeUsername}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                </div>
                                <div className="form-group"> 
                                    <label>PhoneNumber: </label>
                                    <input  type="text"
                                        required
                                        ref="phone"
                                        className="form-control"
                                        placeholder = "eg: 8439xxxxxx"
                                        value={this.state.phonenumber}
                                        disabled = {this.props.disable}
                                        onInput={this.handleChange.bind(this, "phone")} 
                                        onChange={this.onChangePhoneNumber}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="text" 
                                        required
                                        ref="emails"
                                        className="form-control"
                                        value={this.state.email}
                                        disabled = {this.props.disable}
                                        placeholder = "eg: abc123@gmail.com"
                                        onInput={this.handleChange.bind(this, "emails")} 
                                        onChange={this.onChangeEmail}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["emails"]}</span>
                                </div>
                                <div className="form-group" style={{ position: 'absolute', right: '20%', bottom: -70, transform: 'translateX(-40%)'}}>
                                    <input type="submit" disabled = {this.props.disable}  value="Save" className="btn btn-primary" />
                                </div>
                            </form>
                    </div> 
                </div>
            </div>         
        )
      }
}

export default Newcontact;