import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import imageSearch from '../Home/search.svg';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '750px'
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const navStyle = {
    height : '60px'
};

const buttonStyle = {
    marginLeft: '1200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '1090px',
    marginTop : '-270px',
    width : '650px',
    marginLeft : '450px'
}

const containerClassLeft = {
    backgroundColor : '#FEFEFE',
    height: '270px',
    marginTop : '36px',
    width : '350px',
    marginLeft : '50px'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    marginLeft : '30px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}

const divStyle1 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '1250px',
    marginTop : '10px',
    borderRadius : '3px',
    marginLeft : '150px'
}

const h6Style = {
    fontFamily : 'graphik-sans',
    fontSize : '13px',
    marginLeft : '260px',
    marginTop : '-21px',
    color : '#A0A0A0'
}

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    height: '470px',
    width : '1140px',
    marginLeft : '150px',
    marginTop : '10px'
}

const inputStyle1 = {
    width : '400px',
    backgroundColor : '#EBEBED',
    marginLeft : '100px',
    marginTop : '-35px'
}

const imageStyle1 = {
    width : '30px',
    marginLeft : '50px',
    marginTop : '50px'
}

const imageStyle2 = {
    width : '30px',
    marginLeft : '50px',
    marginTop : '50px'
}

const buttonStyle1 = {
    marginLeft : '100px',
    marginTop : '30px',
    width : '200px'
}

const inputStyle2 = {
    width : '400px',
    backgroundColor : '#EBEBED',
    marginLeft : '100px',
    marginTop : '-30px'
}

const buttonStyle2 = {
    marginLeft : '100px',
    marginTop : '30px',
    width : '200px'
}

class ItemSectionUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemToUpdate : "",
            sectionToUpdate : "",
            restauratName : ""
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLogout = () => {
        cookie.remove('cookie',{ path : '/' });
    }

    onDelete = (e) => {
        e.preventDefault();
        localStorage.setItem('ItemToUpdate',this.state.itemToUpdate);
        this.props.history.push(`/Menu/SectionUpdatePage/${localStorage.getItem('ItemToUpdate')}`);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        
    }

    onDeleteSection = (e) => {
        e.preventDefault();
        localStorage.setItem('SectionToUpdate',this.state.sectionToUpdate);
        this.props.history.push(`/Menu/ItemUpdatePage/${localStorage.getItem('SectionToUpdate')}`);
    }

    render() {  
        return (
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a class="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>   
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/ProfileOwner/:id' style = {linkStyle}>Your Profile details</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {divStyle1}>
                        <p style = {pStyle}>Update your item / section <h6 style = {h6Style}>Update. Make your Menu fancy.</h6></p>
                    </div>
                    <div className = "container1" style = {divStyle2}>
                        <form onSubmit = {this.onDelete}>
                        <img src = {imageSearch} alt = "image Search" style = {imageStyle1}></img>
                        <br/>
                        <input type = "text" name = "itemToUpdate" className = "form-control" style = {inputStyle1} placeholder = "Item" onChange = {this.handleInputChange} required></input>
                        <button className = "btn btn-outline-danger" style = {buttonStyle1}>Update your item</button>
                        </form>
                        <br/><br/>
                        <hr/>
                        <form onSubmit = {this.onDeleteSection}>
                        <img src = {imageSearch} alt = "image Search" style = {imageStyle2}></img>
                        <br/>
                        <input type = "text" name = "sectionToUpdate" className = "form-control" style = {inputStyle2} placeholder = "Section" onChange = {this.handleInputChange} required></input>
                        <button className = "btn btn-outline-danger" style = {buttonStyle2}>Update your section</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemSectionUpdate;