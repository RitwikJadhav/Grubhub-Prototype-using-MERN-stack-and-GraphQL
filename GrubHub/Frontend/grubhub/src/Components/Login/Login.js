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
import { login } from '../mutations/mutations';
import { graphql } from 'react-apollo';
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
            Password : "",
            Email : "",
            firstName : "",
            lastName : "",
            phone : "",
            restaurantName : "",
            restaurantZipCode : "",
            cuisine : "",
            role : "",
            authFlag : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag : false
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    submitLogin = async(e) => {
        console.log("Inside login post request");
        e.preventDefault();
        let response = await this.props.login({
            variables : {
                Email : this.state.Email,
                Password : this.state.Password
            }
        })
        console.log(response.data.login);
        this.setState({
            Email : response.data.login.Email,
            FirstName : response.data.login.FirstName,
            LastName : response.data.login.LastName,
            RestaurantName : response.data.login.RestaurantName,
            Cuisine : response.data.login.Cuisine,
            role : response.data.login.role
        });

    }

    handleClose = () => {
        this.setState({
            setShow : false
        })
    }

    render() {
        let redirectVar = null;
            console.log('Inside render');
            localStorage.setItem('Email',this.state.Email);
            localStorage.setItem('FirstName',this.state.FirstName);
            localStorage.setItem('LastName',this.state.LastName);
            localStorage.setItem('RestaurantName',this.state.RestaurantName);
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
                        <input type="email" class="form-control" required id="exampleInputEmail1" name = "Email" aria-describedby="emailHelp" style={formInputStyle} onChange = {this.handleChange}/>
                        <br/>
                        <label for = "Password" style={labelStyle}>Password</label>
                        <input type="password" class="form-control" required id="exampleInputPassword1" name = "Password" required aria-describedby="emailHelp" style={formInputStyle} onChange = {this.handleChange}/>
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

export default graphql(login, {name : "login"})(Login);