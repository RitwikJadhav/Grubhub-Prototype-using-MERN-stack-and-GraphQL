import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import Upload from './UploadImage';
import constants from '../../config';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '750px',
    fontFamily : 'graphik',
    fontSize : '16px'
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const navStyle = {
    height : '60px'
};

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '560px',
    marginTop : '36px',
    width : '450px',
    marginLeft : '550px'
}

const divStyle = {
    fontFamily : 'graphik',
    fontSize : '16px',
    fontWeight : '400',
    marginLeft : '63px',
    color : 'grey',
    width: '260px'
}


const pStyle = {
    fontFamily : 'graphik',
    fontSize : '22px',
    fontWeight : '900',
    marginLeft : '13px',
    paddingTop : '10px'
}

const labelStyle = {
    fontFamily : 'graphik',
    fontSize : '19px',
    marginLeft : '62px'
}

const buttonStyle = {
    marginLeft : '180px',
    marginTop : '3px'
}

const buttonStyle1 = {
    marginLeft: '1150px',
    width : '200px'
}

const linkStyle = {
    color : '#FC8C8C'
}

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName : "",
            LastName : "",
            Email : "",
            PhoneNumber : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount = () => {
        console.log('Inside profile edit componentDidMount');
        var getLocalString = localStorage.getItem('Email');
        var config = {
            headers : {
                Authorization : "JWT "+ localStorage.getItem('Token')
            }
        }
        axios.get(`${constants.apiUrl}Profile/Edit/${getLocalString}`,config)
        .then((response) => {
            console.log(response.data);
            this.setState({
                FirstName : response.data.FirstName,
                LastName : response.data.LastName,
                Email : response.data.Email,
                PhoneNumber : response.data.PhoneNumber
            });
            //document.getElementById('LastNameDiv').innerHTML = response.data[0].LastName;
            //document.getElementById('EmailDiv').innerHTML = response.data[0].Email;
            //document.getElementById('PhoneNumberDiv').innerHTML = response.data[0].PhoneNumber;

        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })  
    }

    onUpdate = (e) => {
        console.log('Inside the update post method');
        const data = {
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
            Email : this.state.Email,
            PhoneNumber : this.state.PhoneNumber
        }
        console.log(data);
        axios.post(constants.apiUrl+"Profile/EditUpdate",data, {
            headers : {
                Authorization : "JWT "+ localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response.status);
            console.log(response.data);
            this.props.history.push('/Profile/:id');
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleLogout = () => {
        window.localStorage.clear();
        cookie.remove('cookie',{ path : '/' });
    }

    render() {
        let redirectVar = null;
        if(!localStorage.getItem('Token')) {
            redirectVar = <Redirect to = '/' />
        }
        return (
            <div>
                {redirectVar}
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a class="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle1}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav> 
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}><b>Your account</b></p>
                        <hr/>
                        <label for = "FirstName" style = {labelStyle}>Firstname</label>
                        <input type = "text" className = "form-control" name="FirstName" onChange = {this.handleChange} style = {divStyle}  defaultValue = {this.state.FirstName}></input>
                        <hr/>
                        <label for = "LastName" style = {labelStyle}>Lastname</label>
                        <input type = "text" className = "form-control" name="LastName" onChange = {this.handleChange} style = {divStyle} value = {this.state.LastName}></input>
                        <hr/>
                        <label for = "PhoneNumber" style = {labelStyle}>Phone-number</label>
                        <input type = "text" className = "form-control" name="PhoneNumber" onChange = {this.handleChange} style = {divStyle} value = {this.state.PhoneNumber}></input>
                        <hr/>
                        <label for = "Email" style = {labelStyle}>Email</label>
                        <br/>
                        <input type = "text" className = "form-control" name="Email" onChange = {this.handleChange} style = {divStyle} value = {this.state.Email}></input>
                        <hr/>
                        <button class = "btn btn-outline-danger" style = {buttonStyle} onClick = {this.onUpdate}>Save</button>
                    </div>  
                </div>
            </div>
        )
    }
}

export default ProfileEdit;