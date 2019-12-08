import {gql} from 'apollo-boost';

const addBuyerMutation = gql`
    mutation addBuyer($FirstName: String, $LastName: String, $Email: String, $Password : String, $role : String) {
            addBuyer(FirstName: $FirstName, LastName: $LastName, Email: $Email, Password: $Password, role : $role) {
                FirstName,
                LastName,
                Email,
                Password,
                role
            }
        }
`;

const addOwnerMutation = gql`
    mutation addOwner($FirstName: String, $LastName: String, $Email: String, $Password : String,$RestaurantName: String,$Cuisine:String, $role : String) {
            addOwner(FirstName: $FirstName, LastName: $LastName, Email: $Email, Password: $Password, RestaurantName: $RestaurantName, Cuisine:$Cuisine, role : $role) {
                FirstName,
                LastName,
                Email,
                Password,
                RestaurantName,
                Cuisine,
                role
            }
        }        
`;

const login = gql`
    mutation login($Email : String, $Password : String) {
        login(Email : $Email, Password : $Password) {
            FirstName,
            LastName,
            RestaurantName,
            Cuisine
            Email,
            role
        }
    }
`;

const buyerProfileUpdate = gql`
    mutation buyerProfileUpdate($FirstName:String, $LastName : String, $Email : String) {
        buyerProfileUpdate(FirstName : $FirstName, LastName : $LastName, Email : $Email) {
            FirstName,
            LastName,
            Email
        }
    }
`;

const getProfile = gql`
    mutation getProfile($Email : String) {
        getProfile(Email:$Email) {
            FirstName,
            LastName,
            Email
        }
    } 
`;

const getOwnerProfile = gql`
    mutation getOwnerProfile($Email : String) {
        getProfile(Email:$Email) {
            FirstName,
            LastName,
            Email,
            RestaurantName,
            Cuisine
        }
    }
`;

const ownerProfileUpdate = gql`
    mutation ownerProfileUpdate($FirstName:String, $LastName : String, $Email : String, $RestaurantName: String, $Cuisine : String) {
        ownerProfileUpdate(FirstName : $FirstName, LastName : $LastName, Email : $Email, RestaurantName : $RestaurantName, Cuisine : $Cuisine) {
            FirstName,
            LastName,
            Email,
            RestaurantName,
            Cuisine
        }
    }
`;

const addSection = gql`
    mutation addSection($sectionName : String, $sectionDescription : String, $RestaurantName : String) {
        addSection(sectionName : $sectionName, sectionDescription : $sectionDescription, RestaurantName : $RestaurantName) {
            sectionName,
            sectionDescription,
            RestaurantName
        }
    }
`;

export {addBuyerMutation, addOwnerMutation, login, buyerProfileUpdate,getProfile, getOwnerProfile, ownerProfileUpdate, addSection};