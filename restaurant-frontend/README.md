# Restaurant Ordering System

Welcome to the Restaurant Ordering System, an innovative application designed to revolutionize the way users explore and enjoy dining options from a variety of restaurants. Seamlessly integrating with Stripe for secure payment processing, this system provides a comprehensive suite of features aimed at enhancing the user experience from account management to placing orders.

## Key Features

### Account Management

- **Sign Up**: Register using an email address and password. A success message confirms account creation.
- **Login**: Secure login with email/password or Google OAuth 2 for a seamless experience. Once logged in, the user’s username is displayed, offering a personalized interface.
- **Logout**: A simple logout process clears the session and navigates the user back to the home page, ensuring security and privacy.

### Navigation and Usability

- **Discover Restaurants**: The home page presents a curated list of restaurants, enabling users to explore a diverse culinary landscape.
- **Search Capabilities**: A robust search function allows users to find restaurants or specific dishes effortlessly, enhancing discoverability.
- **Detailed Menus**: Each restaurant’s page offers an in-depth look at available dishes, complete with search functionality for user convenience.

### Shopping Cart and Checkout

- **Adding Dishes**: Users can add dishes to their cart, receiving instant success feedback for each addition.
- **Cart Management**: Adjust quantities or remove items from the cart; updates to the total price are reflected in real-time. Removal actions prompt a confirmation message to prevent accidental deletions.
- **Secure Checkout**: The checkout process, powered by Stripe, guarantees a secure transaction environment. Success and error messages provide clear feedback on payment outcomes.

### Validation and Feedback

- **Field Validation**: Comprehensive validation across all input fields ensures adherence to format and content standards, including email, password, and payment details.
- **Responsive Messages**: Throughout the application, users receive immediate feedback via success or error messages, guiding them smoothly from account creation to finalizing orders.

## Technical Specifications

- **Frontend**: Crafted with React.js for dynamic UI components, supplemented by Next.js for server-side rendering and seamless page routing. Reactstrap adds Bootstrap-based styling.
- **Backend**: A robust backend built with Node.js and Express, with MongoDB for persistent data storage of user profiles and orders.
- **Authentication**: Google OAuth 2 integration offers a streamlined sign-in process, with additional mechanisms to securely manage user sessions.
- **Payment Processing**: Integrates Stripe for a trustworthy and efficient checkout experience.
- **State Management**: Utilizes the Context API for global state management across the app, enhancing functionality and user experience.

## Getting Started

To explore the application:
1. Clone the repository to your machine.
2. Run `npm install` to install dependencies.
3. Set up `.env.development` and `.env.production` files with `NEXT_PUBLIC_API_URL` for the backend and `SECRET_KEY` and `STRIPE_PUBLIC_KEY` for secure operations.
4. Start the development server with `npm run dev`.
5. Access the app at `http://localhost:3000`.

## Contributing

Your contributions can help make the Restaurant Ordering System even better! If you're interested in adding features, fixing bugs, or improving the code, please fork the repository and submit a pull request with your changes.
