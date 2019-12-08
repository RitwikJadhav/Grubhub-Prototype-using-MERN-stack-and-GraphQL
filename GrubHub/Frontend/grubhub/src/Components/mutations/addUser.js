import {gql} from 'apollo-boost';

const addBuyerMutation = gql`
    mutation AddUser(
        $firstname: String,
        $lastname: String,
        $email: String,
        $password : String) {
            addUser(
                FirstName: $firstname,
                LastName: $lastname,
                Email: $email,
                Password: $password) 
        }
`;

export {addBuyerMutation};