import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import RestaurantDetailsContainer from './RestaurantDetailsContainer';
import { array } from 'prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantSearchItem } from '../../actions/restaurantAction';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1750px'
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

const buttonStyle1 = {
    marginLeft: '50px',
    width : '200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '1490px',
    marginTop : '30px',
    width : '1050px',
    marginLeft : '250px'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '24px',
    marginLeft : '20px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}


class RestaurantDetailsPage extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            restauratName : "",
            itemName : "",
            itemPrice : ""
        }*/
        this.state = {
            sections : [],
            restaurantToSearch : "",

        }
    }

    componentWillReceiveProps({item}) {
        console.log('Inside search items will receive props');
        this.setState({
            sections : item
        });
    }

    componentDidMount() {
        console.log('Inside the restaurant search component did mount');

        this.props.restaurantSearchItem();
        // let restaurantToSearch = localStorage.getItem('RestaurantNameForCustomer');
        /*let restaurantToSearch = this.props.match.params.id;
        console.log(this.props);
        console.log(restaurantToSearch);
        const config = {
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        }
        axios.get(`http://localhost:3001/Restaurant/DetailsPage/${restaurantToSearch}`,config)
        .then(response => {
            console.log(response.data);
            this.setState({
                sections : response.data
            })
        })*/
        
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
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/Profile/:id' style = {linkStyle}>{localStorage.getItem('FirstName')} Profile details !</Link></button>
                                </li>
                                <li>
                                <button class = 'btn btn-outline-danger' style = {buttonStyle1}><Link to = '/' style = {linkStyle}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>  
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}>Restaurant Name : {localStorage.getItem('RestaurantNameForCustomer')}</p>
                        <hr/>
                        <RestaurantDetailsContainer sections = {this.state.sections}/>
                    </div>
                </div>
            </div>
        )
    }
}

RestaurantDetailsPage.protoType = {
    restaurantSearchItem : PropTypes.func.isRequired,
    item : PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    item : state.searchItemsForRestaurant.itemsToDisplay
})

export default connect(mapStateToProps, { restaurantSearchItem })(RestaurantDetailsPage);