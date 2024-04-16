import { gql } from '@apollo/client';
export const GET_USER_ORDERS = gql`
query ($userId: ID!) {
  orders(where: { user: $userId }, sort: "createdAt:desc") {
    address
    city
    state
    amount
    charge_id
    createdAt
    dishes 
  }
}

`;
