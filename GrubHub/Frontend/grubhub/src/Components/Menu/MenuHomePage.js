import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import MenuPage from './MenuPage';
import DisplayImage from './DisplayImage';
import paginate from 'paginate-array';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemMenuDisplay } from '../../actions/itemAction';
import { getSectionsQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import { getSections } from '../mutations/mutations';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '2550px'
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
    marginLeft: '910px',
    width : '200px'
}

const buttonStyle2 = {
    marginLeft: '50px',
    width : '200px'
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
    fontSize : '24px',
    marginLeft : '230px',
    paddingTop : '15px',
    textDecoration : 'none',
    fontWeight : '900'
}

const divStyle1 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '650px',
    marginTop : '10px',
    borderRadius : '3px'
}

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    height: '450px',
    marginTop : '16px',
    width : '370px',
    marginLeft : '50px'
}

const pStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '20px'
}

const pStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '10px'
}

const pStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '0px'
}

const divStyle3 = {
    backgroundColor : '#FEFEFE',
    marginTop : '35px',
    marginLeft : '-15px',
    width : '650px',
    height : '2250px',
    padding: '1rem 2rem'
}


const inputStyle = {
    width : '200px',
    marginLeft : '200px',
    marginTop : '-200px',
    marginBottom : '65px'
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '0px'
}

const pStyle5 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '0px'
}

const inputStyle2 = {
    width : '200px',
    marginLeft : '200px',
    marginTop : '-200px',
    marginBottom : '400px'
}

const inputStyle3 = {
    width : '300px',
    marginLeft : '200px',
    marginTop : '-385px',
    marginBottom : '285px'
}

const inputStyle4 = {
    width : '100px',
    marginLeft : '200px',
    marginTop : '-265px',
    marginBottom : '30px'
}

const divStyle4 = {
    backgroundColor : '#EBEBED',
    width : '150px',
    height : '150px',
    marginTop : '29px',
    marginBottom : '50px'
}

const divStyle5 = {
    marginTop : '-10px'
}

const inputStyle5 = {
    width: '50%',
    fontSize : '18px',
    fontWeight : '800',
    marginBottom : '1%'
}

const inputStyle6 = {
    width: '50%',
}


class MenuHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentPage : 1,
            itemsPerPage : 3,
            sections : []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount = async () => {
        console.log('Inside component will mount method');
        let response = await this.props.getSections({
            variables : {
                RestaurantName : localStorage.getItem("RestaurantName")
            }
        })
        console.log(response.data.getSections);
        this.setState({
            sections : response.data.getSections
        })
        //this.props.itemMenuDisplay();
        /*var localRestaurantName = localStorage.getItem('RestaurantName');
        const config = {
            headers : {
                Authorization : "JWT " + localStorage.getItem('Token')
            }
        }
        axios.get(`http://localhost:3001/Menu/HomePage/${localRestaurantName}`,config)
        .then(response => {
            this.setState({ items : response.data });
        });*/
    }

    handleLogout = () => {
        window.localStorage.clear();
        cookie.remove('cookie',{ path : '/' });
    }

    handleClick(event) {
        console.log(event.target.id);
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    render() { 
        let sectionList = this.state.sections.map(section => {
            return (
                <div>
                    <input type = "text" name = "sectionName" className = "form-control" defaultValue = {section.sectionName} style = {inputStyle5}></input>
                    {section.items.map(item => {
                        return (
                            <div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Item Name</div>
                                    </div>
                                    <input type = "text" name = "itemName" className = "form-control" defaultValue = {item.itemName} style = {inputStyle6}></input>
                                </div>
                                <div class = "input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Item Price</div>
                                    </div>
                                    <input type = "text" name = "itemprice" className = "form-control" defaultValue = {item.itemprice} style = {inputStyle6}></input>
                                </div>
                                <hr/>
                            </div>
                        )
                    })}
                    <hr/>
                </div>
            )  
        })
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
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/ProfileOwner/:id' style = {linkStyle}>Your Profile details !</Link></button>
                                </li>
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle2}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {divStyle1}>
                        <p style = {pStyle}>Restaurant Menu</p>
                        <div className = "jumbotron" style = {divStyle3}>
                            {sectionList}  
                        </div>
                    </div>

                    <div className = "containerLeft" style = {divStyle2}>
                        <p style = {pStyle1}><Link to = "/Menu/SectionAddPage">Add new sections to the menu</Link></p>
                        <hr/>
                        <p style = {pStyle2}><Link to = "/Menu/ItemAddPage">Make your Menu interesting by adding more items </Link></p>
                        <hr/>
                        <p style = {pStyle3}><Link to = "/Menu/ItemRemovePage">Remove uninteresting items and sections </Link></p>
                        <hr/>
                        <p style = {pStyle4}><Link to = "/Menu/ItemSectionUpdate">Thinking of updating your items in the menu ?</Link></p>
                        <hr/>
                        <p style = {pStyle5}><Link to = "/Menu/ItemSectionUpdate">Review your sections and update them</Link></p>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }
}

export default graphql(getSections, {name : "getSections"})(MenuHomePage);