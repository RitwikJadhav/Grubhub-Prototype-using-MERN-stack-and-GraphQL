import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import Upload from './UploadImage';
import constants from '../../config';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileDetails } from '../../actions/profileAction';

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
    marginTop : '-366px',
    width : '450px',
    marginLeft : '550px'
}

const divStyle = {
    fontFamily : 'graphik',
    fontSize : '16px',
    fontWeight : '400',
    marginLeft : '63px',
    color : 'grey'
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
    marginLeft : '53px'
}

const buttonStyle = {
    marginLeft : '180px',
    marginTop : '3px',
}

const linkStyle = {
    color : '#FC8C8C'
}

const containerLeftClass = {
    marginLeft : '10px',
    backgroundColor : '#FEFEFE',
    width : '300px',
    height : '300px',
    marginTop : '100px',
    marginLeft : '50px'
}

const buttonStyle1 = {
    marginLeft: '1150px',
    width : '200px'
}

class profile extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillReceiveProps({ profiles }) {
        console.log('Insdide component will received props');
        console.log(profiles);
        document.getElementById('FirstNameDiv').innerHTML = profiles.FirstName;
        document.getElementById('LastNameDiv').innerHTML = profiles.LastName;
        document.getElementById('EmailDiv').innerHTML = profiles.Email;
        document.getElementById('PhoneNumberDiv').innerHTML = profiles.PhoneNumber;
    }

    componentDidMount = () => {
        console.log('Inside componentDidMount');
        this.props.getProfileDetails();
        /*var getLocalString = localStorage.getItem('Email')
        let config = {
            headers : {
                Authorization : "JWT " + localStorage.getItem('Token')
            }
        }
        axios.get(`${constants.apiUrl}Profile/${getLocalString}`,config)
        .then((response) => {
            console.log(response.data);
            document.getElementById('FirstNameDiv').innerHTML = response.data.FirstName;
            document.getElementById('LastNameDiv').innerHTML = response.data.LastName;
            document.getElementById('EmailDiv').innerHTML = response.data.Email;
            document.getElementById('PhoneNumberDiv').innerHTML = response.data.PhoneNumber;

        })*/
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })  
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
                    <div className = "containerLeft" style = {containerLeftClass}>
                        <Upload />
                    </div>
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}><b>Your account</b></p>
                        <hr/>
                        <label for = "FirstName" style = {labelStyle}>Firstname</label>
                        <div id = "FirstNameDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <label for = "LastName" style = {labelStyle}>Lastname</label>
                        <div id = "LastNameDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <label for = "Email" style = {labelStyle}>Email</label>
                        <div id = "EmailDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <label for = "PhoneNumber" style = {labelStyle}>Phone-number</label>
                        <div id = "PhoneNumberDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <button class = "btn btn-outline-danger" style = {buttonStyle}><Link to = '/ProfileEdit/:id' style = {linkStyle}>Edit</Link></button>
                    </div>  
                </div>
            </div>
        )
    }
}

profile.protoType = {
    getProfileDetails : PropTypes.func.isRequired,
    profiles : PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    profiles : state.profile.getProfile
})

export default connect(mapStateToProps, { getProfileDetails })(profile);