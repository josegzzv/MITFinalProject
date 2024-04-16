import { gql } from '@apollo/client';
export const GET_RESTAURANT_DETAILS = gql`
query GetRestaurantDetails($id: ID!) {
  restaurant(id: $id) {
    id
    name
    dishes {
      id
      name
      description
      price
      image {
        url
      }
    }
  }
}
`;