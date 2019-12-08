import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './grubhub-vector-logo.svg';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpBuyer } from '../../actions/signupAction';
import { addBuyerMutation } from '../mutations/mutations';
import { graphql } from 'react-apollo';

const loginContainerStyle = {
    backgroundColor : '#FEFEFE',
    height: '550px',
    marginTop : '36px',
    width : '448px',
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
    marginLeft: '130px',
    fontFamily : 'graphik',
    fontWeight : '400',
    fontSize : '14px',
    marginTop: '13px'

}

const pStyle4 = {
    marginLeft: '70px',
    fontFamily : 'graphik',
    fontWeight : '400',
    fontSize : '14px',
    marginTop: '13px'

}

const pstyle3 = {
    fontFamily : 'graphik',
    fontWeight : '400',
    fontSize : '12px',
    marginLeft: '18px'
}

const formInputStyle = {
    width: '36%',
    marginLeft : '58px'
};

const formInputStyle1 = {
    width: '38%',
    marginLeft: '216px',
    marginTop: '-62px'
};

const formInputStyle2 = {
    width: '76%',
    marginLeft : '58px'
};

const labelStyle = {
    width: '72%',
    marginLeft : '60px',
    fontFamily: 'graphik'
};

const labelStyleP = {
    width: '72%',
    marginLeft : '60px',
    fontFamily: 'graphik',
    marginTop : '19px'    
};

const labelStyle1 = {
    marginLeft: '-130px',
    fontFamily: 'graphik',
};

const buttonClass = {
    marginLeft : '57px',
    width: '73%',
    fontFamily: 'grubhubsans-bold'
};

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FirstName : "",
            LastName : "",
            Email : "",
            Password : "",
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

    submitLogin = async (e) => {
        console.log("Inside signup post request");
        e.preventDefault();

        /*const data = {
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            password : this.state.password,
            buyer : this.state.buyer
        }

        /*axios.post('http://localhost:3001/Signup/Buyer',data)
        .then(response => {
            console.log(response.status);
            if(response.status === 200) {
                this.setState({
                    authFlag : true
                })
                this.props.history.push('/login');
            }
        })*/

        let response = await this.props.addBuyerMutation({
            variables : {
                FirstName : this.state.FirstName,
                LastName : this.state.LastName,
                Email : this.state.Email,
                Password : this.state.Password,
                role : "Buyer"
            }
        })
        console.log(response.data);

        //this.props.signUpBuyer(data);
        this.props.history.push('/Login');
    }

    render() {
        return(
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                    <a class="navbar-brand" href="#">
                        <img src = {Logo} style={imageStyle} alt="Grubhub   "/>
                    </a>
                    </nav>   
                    <div className = "form-group" style = {loginContainerStyle}>
                        <p style={pStyle1}><b>Create your Account</b></p>
                        <table>
                            <tr>
                                <td>
                                    <label for = "FirstName" style={labelStyle}>Firstname</label>
                                    &nbsp;
                                    <label for = "LastName" style={labelStyle1}>Lastname</label>
                                    <input type="text" class="form-control" id="fName" name = "FirstName" style={formInputStyle} onChange = {this.handleChange}/>
                                    &nbsp;
                                    <input type="text" class="form-control" id="lName" name = "LastName" style={formInputStyle1} onChange = {this.handleChange}/>
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for = "Email" style={labelStyle}>Email</label>
                                    <input type="email" class="form-control" id="exampleInputEmail" name = "Email" aria-describedby="emailHelp" style={formInputStyle2} onChange = {this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for = "Password" style={labelStyleP}>Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" name = "Password" aria-describedby="emailHelp" style={formInputStyle2} onChange = {this.handleChange}/>
                                </td>
                            </tr>
                        </table>
                       
                        <br/>
                        <button type="button" class="btn btn-primary" style={buttonClass} onClick = {this.submitLogin}>
                            <b>Create your account</b>
                        </button>
                        <p style={pStyle2}>Have an account ?<Link to = '/Login'> Sign in</Link></p>
                        <p style={pStyle4}>Do you own a restaurant? Partner with us<Link to = '/Signup/Owner'> Signup !</Link></p>
                        <p style = {pstyle3}>By creating your Grubhub account, you agree to the <Link>Terms of Use</Link> and <Link>Privacy Policy</Link></p>
                    </div>     
                </div>
            </div>    
        )
    }
}

export default graphql(addBuyerMutation, {name : "addBuyerMutation"})(Signup);