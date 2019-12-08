import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import Upload from './UploadImage';
import constants from '../../config';
import { getOwnerProfile, ownerProfileUpdate } from '../mutations/mutations';
import { graphql, compose } from 'react-apollo';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1050px',
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
    height: '670px',
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

class ProfileEditOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName : "",
            LastName : "",
            Email : "",
            PhoneNumber : "",
            RestaurantName : "",
            RestaurantZipCode : "",
            Cuisine : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount = async() => {
        console.log('Inside profile edit componentDidMount');
        /*var getLocalString = localStorage.getItem('Email');
        var config = {
            headers : {
                Authorization : "JWT "+ localStorage.getItem('Token')
            }
        };
        axios.get(`${constants.apiUrl}ProfileOwner/Edit/${getLocalString}`,config)
        .then((response) => {
            console.log(response.data);
            this.setState({
                FirstName : response.data.FirstName,
                LastName : response.data.LastName,
                Email : response.data.Email,
                PhoneNumber : response.data.PhoneNumber,
                RestaurantName : response.data.RestaurantName,
                RestaurantZipCode : response.data.RestaurantZipCode,
                Cuisine : response.data.Cuisine
            });
            //document.getElementById('LastNameDiv').innerHTML = response.data[0].LastName;
            //document.getElementById('EmailDiv').innerHTML = response.data[0].Email;
            //document.getElementById('PhoneNumberDiv').innerHTML = response.data[0].PhoneNumber;

        })*/

        let response = await this.props.getOwnerProfile({
            variables : {
                Email : localStorage.getItem('Email')
            }
        })
        console.log(response.data.getProfile);
        this.setState({
            FirstName : response.data.getProfile.FirstName,
            LastName : response.data.getProfile.LastName,
            Email : response.data.getProfile.Email,
            RestaurantName : response.data.getProfile.RestaurantName,
            Cuisine : response.data.getProfile.Cuisine
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })  
    }

    onUpdate = async(e) => {
        console.log('Inside the update post method');
        /*const data = {
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
            Email : this.state.Email,
            PhoneNumber : this.state.PhoneNumber,
            RestaurantName : this.state.RestaurantName,
            RestaurantZipCode : this.state.RestaurantZipCode,
            Cuisine : this.state.Cuisine
        }
        console.log(data);
        axios.post(constants.apiUrl+"ProfileOwner/EditUpdateOwner",data, {
            headers : {
                Authorization : "JWT "+localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response.status);
            console.log(response.data);
            this.props.history.push('/ProfileOwner/:id');
        })
        .catch(error => {
            console.log(error)
        });*/

        let response = await this.props.ownerProfileUpdate({
            variables : {
                FirstName : this.state.FirstName,
                LastName : this.state.LastName,
                Email : this.state.Email,
                RestaurantName : this.state.RestaurantName,
                Cuisine : this.state.Cuisine
            }
        })
        console.log(response.data);
        this.props.history.push('/profileOwner/:id')
    }

    render() {
        return (
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a class="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>
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
                        <label for = "Email" style = {labelStyle}>Email</label>
                        <br/>
                        <input type = "text" className = "form-control" name="Email" onChange = {this.handleChange} style = {divStyle} value = {this.state.Email}></input>
                        <hr/>
                        <label for = "RestaurantName" style = {labelStyle}>Restaurant Name</label>
                        <input type = "text" className = "form-control" name="RestaurantName" onChange = {this.handleChange} style = {divStyle} value = {this.state.RestaurantName}></input>
                        <hr/>
                        <label for = "Cuisine" style = {labelStyle}>Cuisine</label>
                        <br/>
                        <input type = "text" className = "form-control" name="Cuisine" onChange = {this.handleChange} style = {divStyle} value = {this.state.Cuisine}></input>
                        <hr/>
                        <button class = "btn btn-outline-danger" style = {buttonStyle} onClick = {this.onUpdate}>Save</button>
                    </div>  
                </div>
            </div>
        )
    }
}

export default compose(graphql(ownerProfileUpdate,{name : "ownerProfileUpdate"}),graphql(getOwnerProfile,{name : "getOwnerProfile"}))(ProfileEditOwner);