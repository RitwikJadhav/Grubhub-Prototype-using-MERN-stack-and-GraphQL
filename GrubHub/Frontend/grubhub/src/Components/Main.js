import React, {Component} from 'react';
import Login from './Login/Login'
import signup from './Signup/Signup'
import ownersignup from './Signup/OwnerSignup';
import {Route} from 'react-router-dom';
import HomePage from './Landing Page/HomePage';
import home from './Home/home';
import profile from './Profile/profile';
import homeOwner from './Home/homeOwner';
import profileOwner from './Profile/ProfileOwner';
import profileEdit from './Profile/ProfileEdit';
import profileOwnerEdit from './Profile/ProfileEditOwner';
import menuHomePage from './Menu/MenuHomePage';
import addItemPage from './Menu/ItemAddPage';
import removeItemPage from './Menu/ItemRemovePage';
import sectionAddPage from './Menu/SectionAddPage';
import ItemUpdatePage from './Menu/ItemUpdatePage';
import SectionUpdatePage from './Menu/SectionUpdatePage';
import SearchResults from './Buyer/SearchResults';
import ItemSectionUpdate from './Menu/ItemSectionUpdate';
import RestaurantDetailsPage from './Restaurants/RestaurantDetailsPage';
import CheckoutPage from './Restaurants/CheckoutPage';

class Main extends Component {
    render() {
        return(
            <div>
                <Route exact path = "/" component = {HomePage} />
                <Route path = "/login" component = {Login} />
                <Route path = "/Signup/Buyer" component = {signup} />
                <Route path = "/Signup/Owner" component = {ownersignup} />
                <Route path = "/home" component = {home} />
                <Route path = "/homeOwner" component = {homeOwner} />
                <Route path = "/Profile/:id" component = {profile} />
                <Route path = "/ProfileOwner/:id" component = {profileOwner} />
                <Route path = "/ProfileEdit/:id" component = {profileEdit} />
                <Route path = "/ProfileEditOwner/:id" component = {profileOwnerEdit} />
                <Route path = "/Menu/HomePage/:id" component = {menuHomePage} />
                <Route path = "/Menu/ItemAddPage" component = {addItemPage} />
                <Route path = "/Menu/ItemRemovePage" component = {removeItemPage} />
                <Route path = "/Menu/SectionAddPage" component = {sectionAddPage} />
                <Route path = "/Menu/ItemUpdatePage" component = {ItemUpdatePage} />
                <Route path = "/Menu/SectionUpdatePage/:id" component = {SectionUpdatePage} />
                <Route path = "/SearchResults" component = {SearchResults} />
                <Route path = "/Menu/ItemSectionUpdate" component = {ItemSectionUpdate} />
                <Route path = "/Restaurant/DetailsPage/:id" component = {RestaurantDetailsPage} />
                <Route path = "/Restaurant/CheckoutPage" component = {CheckoutPage} />
            </div>
        )
    }
}

export default Main;