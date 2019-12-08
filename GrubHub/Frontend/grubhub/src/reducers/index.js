import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import itemReducer from './itemReducer';
import sectionReducer from './sectionReducer';
import searchReducer from './searchReducer';
import restaurantSearchReducer from './restaurantReducer';
import orderReducer from './orderReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    logins: loginReducer,
    signup : signupReducer,
    menuItems : itemReducer,
    sections : sectionReducer,
    searchedItems : searchReducer,
    searchItemsForRestaurant : restaurantSearchReducer,
    orders : orderReducer,
    profile : profileReducer
});