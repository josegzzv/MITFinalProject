JAG Restaurant App GraphQL API Documentation

Welcome to the JAG Restaurant App GraphQL API documentation. Here you will find detailed information about the GraphQL queries available for interacting with our restaurant application.

Queries

GET_RESTAURANTS
Description:
Retrieve a list of all restaurants with basic details.

Query:

graphql
Copy code
query {
  restaurants {
    id
    name
    description
    image {
      url
    }
  }
}
Parameters: None

Returns:
An array of restaurant objects, each containing:

id: The unique identifier of the restaurant.
name: The name of the restaurant.
description: A brief description of the restaurant.
image: An object containing the URL of the restaurant's image.
GET_RESTAURANT_DETAILS
Description:
Fetch detailed information about a specific restaurant, including the dishes they offer.

Query:

graphql
Copy code
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
Parameters:

$id (ID): The unique identifier of the restaurant.
Returns:
A single restaurant object with:

id: The unique identifier of the restaurant.
name: The name of the restaurant.
dishes: An array of dish objects available at the restaurant, each containing:
id: The unique identifier of the dish.
name: The name of the dish.
description: A description of the dish.
price: The price of the dish.
image: An object containing the URL of the dish's image.
GET_USER_ORDERS
Description:
Obtain a list of orders made by a specific user, sorted by the creation date in descending order.

Query:

graphql
Copy code
query GetUserOrders($userId: ID!) {
  orders(where: { user: $userId }, sort: "createdAt:desc") {
    id
    address
    city
    state
    amount
    charge_id
    createdAt
    dishes {
      name
      price
    }
  }
}
Parameters:

$userId (ID): The unique identifier of the user.
Returns:
An array of order objects, each including:

id: The unique identifier of the order.
address: The delivery address for the order.
city: The city for the delivery address.
state: The state for the delivery address.
amount: The total amount charged for the order.
charge_id: The Stripe charge ID associated with the order.
createdAt: The timestamp when the order was created.
dishes: An array of dish objects included in the order, each containing:
name: The name of the dish.
price: The price of the dish.

Please note that these queries are meant to be executed in an environment where the user is authenticated, and the necessary permissions are in place to access the data. For any additional information or support, please contact the API team.