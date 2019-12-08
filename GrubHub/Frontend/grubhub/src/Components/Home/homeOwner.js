import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import OwnerOrderContainer from './OwnerOrderContainer';
import { Modal,Button,InputGroup,FormControl, Alert } from 'react-bootstrap';
import constants from '../../config';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOwnerOrders, updateOrderStatus } from '../../actions/orderAction';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1250px'
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
    marginLeft: '870px',
    width : '230px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '1090px',
    marginTop : '-270px',
    width : '1050px',
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
    fontSize : '22px',
    marginLeft : '90px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}

const buttonStyle1 = {
    marginLeft: '50px',
    width : '200px'
}

const divStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '50px'
}


const divStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '180px'
}

const divStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '400px'
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '30px'
}

const pStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '200px',
    marginTop : '-72px'
}

const pStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '380px',
    marginTop : '-72px'
}

const pStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '22px',
    marginLeft : '90px',
    paddingTop : '10px',
    textDecoration : 'none',
    fontWeight : '900'
}

const pStyle5 = {
    fontFamily : 'graphik-sans',
    fontSize : '22px',
    marginLeft : '65px',
    paddingTop : '10px',
    textDecoration : 'none',
    fontWeight : '900'
}

const modalStyle = {
    fontFamily : 'graphik'
}

const pStyle6 = {
    fontFamily : 'graphik-sans',
    fontSize : '19px',
    fontWeight : '900'
}

const pStyle7 = {
    fontFamily : 'graphik-sans',
    fontSize : '19px',
    fontWeight : '900'
}

const inputStyle = {
    marginTop : '-14px',
    marginBottom : '5px'
}

const inputStyle1 = {
    marginTop : '-14px',
    marginBottom : '5px'
}

const divStyle5 = {
    height : '150px'
}

class homeOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName : "",
            orders : [],
            selectedValue : "",
            orderid : "",
            itemName : "",
            delivered : [],
            setShow : false,
            messages : [],
            message : "",
            sender : "",
            alertShow : false,
            receiver : ""
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleMessagesModal = this.handleMessagesModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleReceivedMessages = this.handleReceivedMessages.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillReceiveProps({activeOrders}) {
        console.log('Inside will receive props');
        if(activeOrders.Status == 'Order delivered') {
            this.setState({
                delivered : activeOrders
            });
        }
        else {
            this.setState({
                orders : activeOrders
            });
        }
    }

    componentDidMount() {
        console.log('Inside recent orders request');
        const data = {
            restaurantName : localStorage.getItem('RestaurantName')
        }
        this.props.getOwnerOrders(data);
    }

    handleLogout = () => {
        window.localStorage.clear();
        cookie.remove('cookie',{ path : '/' });
    }

    handleMessagesModal = () => {
        this.setState({
            setShow : true
        });

        console.log('Inside handle received messages');
        const data = {
            restaurantName : localStorage.getItem('RestaurantName')
        }
        axios.post(constants.apiUrl+'Message/ReceivedMessages',data,{
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                messages : response.data
            });
        }) 
        .catch(err => {
            console.log(err);
        })
    }

    handleCloseModal = () => {
        this.setState({
            setShow : false,
            alertShow : false
        });
    }

    handleReceivedMessages = () => {
        
    }

    handleMessage = () => {
        console.log('Inside message reply send request');
        const data = {
            sender : localStorage.getItem('RestaurantName'),
            receiver : this.state.receiver,
            message : this.state.message
        }
        axios.post(constants.apiUrl+'Message/SendReply',data,{
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response);
            this.setState({
                alertShow : true
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {  
        let redirectVar = null;
        const delivered = this.state.delivered.map((delItem) => (
            <div key = {delItem.orderid}>
                <p style = {pStyle4}>Order id</p>
                <div style = {divStyle4}>{delItem.orderid}</div>
                <p style = {pStyle1}>Item Name</p>
                <div style = {divStyle1}>{delItem.ItemNames}</div>
                <p style = {pStyle2}>Customer Name</p>
                <div  style = {divStyle2}>{delItem.OrderPersonName}</div>
                <div></div>
            </div>
        )); 

        const messagesReceived = this.state.messages.map((msg) => (
            <div>
                <p style = {pStyle6}>From : </p>
                <input type = "text" className = "form-control" defaultValue = {msg.sender} style = {inputStyle}></input>
                <p style = {pStyle7}>Message : </p>
                <div className = "form-control" style = {divStyle5}>{msg.message.map((m) => (
                    <div>{m}</div>
                ))}</div>
                
                <hr/>
            </div>
        ));
        return (
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a className="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>   
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/ProfileOwner/:id' style = {linkStyle}>{localStorage.getItem('FirstName')} Profile details</Link></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle1}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "containerLeft" style = {containerClassLeft}>
                        <p style = {pStyle}><Link to = {"/Menu/HomePage/"+localStorage.getItem('RestaurantName')}>Edit your Menu</Link></p>
                        <hr/>
                        <br/><br/><br/>
                        <hr/>
                        <p style = {pStyle5}><Link onClick = {this.handleMessagesModal}>Check your messages</Link></p>
                    </div>
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}>Recent Orders</p>
                        <hr/>
                        <OwnerOrderContainer orders = {this.state.orders}/>
                        <hr/>
                        <p style = {pStyle3}>Delivered Orders</p>
                        <hr/>
                        {delivered}
                    </div>  
                </div>
                <Modal show={this.state.setShow} onHide={this.handleCloseModal} style = {modalStyle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Messages</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {messagesReceived}
                    <Alert show = {this.state.alertShow} variant = 'success'>
                        Message sent.
                    </Alert>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>To</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name = "receiver"
                            onChange = {this.handleInput}
                            placeholder="Customer's Name"
                        required/>
                    </InputGroup>
                    <InputGroup>
                        <FormControl 
                            as="textarea"
                            name = "message"
                            onChange = {this.handleInput}
                            required/>
                     </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleMessage}>
                            Send
                        </Button>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

homeOwner.protoType = {
    getOwnerOrders : PropTypes.func.isRequired,
    updateOrderStatus : PropTypes.func.isRequired,
    activeOrders : PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    activeOrders : state.orders.ordersReceived
})

export default connect(mapStateToProps, { getOwnerOrders, updateOrderStatus})(homeOwner);