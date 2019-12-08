import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './grubhub-vector-logo.svg';
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/loginAction';
import constants from '../../config.js';
var jwtDecode = require('jwt-decode');


const loginContainerStyle = {
    backgroundColor : '#FEFEFE',
    height: '430px',
    marginTop : '36px',
    width : '400px',
    marginLeft : '550px'
    
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '750px'
};


const navStyle = {
    height : '60px'
};

const pStyle1 = {
    marginLeft: '60px',
    fontFamily : 'grubhubsans-bold',
    fontWeight : '400',
    fontSize : '24px',
    paddingTop : '40px'

}

const pStyle2 = {
    marginLeft: '140px',
    fontFamily : 'grubhubsans-bold',
    fontWeight : '400',
    fontSize : '14px',
    marginTop: '40px'

}

const formInputStyle = {
    width: '72%',
    marginLeft : '58px'
};

const labelStyle = {
    width: '72%',
    marginLeft : '60px',
    fontFamily: 'graphik'
};

const buttonClass = {
    marginLeft : '57px',
    width: '73%',
    fontFamily: 'grubhubsans-bold'
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username : "",
            password : "",
            email : "",
            firstName : "",
            lastName : "",
            phone : "",
            restaurantName : "",
            restaurantZipCode : "",
            cuisine : "",
            role : "",
            authFlag : false
        }
        this.usernameHandler = this.usernameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag : false
        });
    }

    usernameHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    submitLogin = (e) => {
        console.log("Inside login post request");
        e.preventDefault();

        const data = {
            username : this.state.username,
            password : this.state.password,
            setShow : false
        }
        console.log(data);
        //this.props.loginRequest(data);
        axios.defaults.withCredentials = true;
        axios.post(constants.apiUrl+'Login',data)
        .then(response => {
            console.log(response.data.token);
            const fullJwtToken = response.data.token;
            const tokenURL = fullJwtToken.split(' ')[1];
            console.log(tokenURL);
            var decodedResponse = jwtDecode(tokenURL);
            console.log("Token : "+tokenURL);
            localStorage.setItem('Token',tokenURL);
            console.log(decodedResponse.role);
            if(response.status === 200) {
                if(decodedResponse.role == 'Buyer' || decodedResponse.role == 'Owner') {
                //if(response.data[0].role == 'Buyer' || response.data[0].role == 'Owner') {
                    console.log(response.data);
                    console.log('yeee');
                    this.setState({
                        email : decodedResponse.Email,
                        firstName : decodedResponse.FirstName,
                        lastName : decodedResponse.LastName,
                        phone : decodedResponse.PhoneNumber,
                        restaurantName : decodedResponse.RestaurantName,
                        restaurantZipCode : decodedResponse.RestaurantZipCode,
                        cuisine : decodedResponse.Cuisine,
                        role : decodedResponse.role
                    })            
                }
                
            }
            else {
                this.setState({
                    setShow : true
                })
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                setShow : true
            })
        })
    }

    handleClose = () => {
        this.setState({
            setShow : false
        })
    }

    render() {
        let redirectVar = null;
            console.log('Inside render');
            localStorage.setItem('Email',this.state.email);
            localStorage.setItem('FirstName',this.state.firstName);
            localStorage.setItem('LastName',this.state.lastName);
            localStorage.setItem('PhoneNumber',this.state.phone);
            localStorage.setItem('RestaurantName',this.state.restaurantName);
            localStorage.setItem('RestaurantZipCode',this.state.restaurantZipCode);
            localStorage.setItem('Cuisine',this.state.cuisine);
            if(this.state.role == 'Buyer') {
                console.log('Inside the buyer render')
                redirectVar = <Redirect to="/home"/>
            }
            else if(this.state.role == 'Owner') {
                console.log('Inside owner render')
                redirectVar = <Redirect to="/homeOwner"/>
            }
            else {
                console.log('cookie else')
            }
        return(
            <div>
                {redirectVar}
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                    <a class="navbar-brand" href="#">
                        <img src = {Logo} style={imageStyle} alt="Grubhub   "/>
                    </a>
                    </nav>   
                    <div className = "form-group" style = {loginContainerStyle}>
                        <p style={pStyle1}><b>Sign in with your Grubhub account</b></p>
                        <hr/>
                        <form>
                        <label for = "Email" style={labelStyle}>Email</label>
                        <input type="text" class="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" style={formInputStyle} onChange = {this.usernameHandler}/>
                        <br/>
                        <label for = "Password" style={labelStyle}>Password</label>
                        <input type="password" class="form-control" required id="exampleInputPassword1" required aria-describedby="emailHelp" style={formInputStyle} onChange = {this.passwordHandler}/>
                        <br/>
                        <button type="button" class="btn btn-danger" style={buttonClass} onClick = {this.submitLogin}>
                            <b>    
                                Sign In</b>
                        </button>
                        </form>
                        <Link to = "/Signup/Buyer" style={pStyle2}>Create your account</Link>
                    </div>     
                </div>
                <Modal show={this.state.setShow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Information</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Error : Invalid credentials. Please try again</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
            </div>    
        )
    }
}

/*Login.propTypes = {
    loginRequest : PropTypes.func.isRequired
};*/

export default Login;