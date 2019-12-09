import { gql } from 'apollo-boost';

const getSectionsQuery = gql`
    {
        sections {
            sectionName
            sectionDescription
            RestaurantName,
            items {
                itemName
                itemprice
            }
        }
    }
`;

export { getSectionsQuery };