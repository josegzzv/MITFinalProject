import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import AppContext from "../components/context";
import Layout from "../components/layout";
import { encryptData, decryptData } from "../utils/encrypt";
import { checkTokenValidity } from "../components/auth";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

function MyApp(props) {
  var { addItem, emptyCart, removeItem, setUser } = useContext(AppContext);
  const { Component, pageProps } = props;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  const [state, setState] = useState(() => {
    let initialState = {
      cart: { items: [], total: 0 },
      user: null,
    };
  
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cart");
        const storedUser = localStorage.getItem("user");

        if (storedCart) {
          initialState.cart = decryptData(storedCart);
        }
        if (storedUser) {
          initialState.user = decryptData(storedUser);
        }

        // Additional validation to ensure decrypted data is not null
        if (!initialState.cart || initialState.cart === null) {
          initialState.cart = { items: [], total: 0 };
        }
        if (!initialState.user || initialState.user === null) {
          initialState.user = null;
        }
      } catch (error) {
        console.error("Error decrypting data ERROR!!", error);
        // Reset to default state in case of error
        initialState = {
          cart: { items: [], total: 0 },
          user: null,
        };
      }
    }
    return initialState;
  });
  
  //console.log(`URL: ${API_URL}`);
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  setUser = (user) => {
    setState((prevState) => ({ ...prevState, user }));
    if (user === null || user === "") {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", encryptData(user));
    }
  };

  const isAuthenticated = async () => {
    if (state.user && state.user.token) {
      return await checkTokenValidity(state.user.token);
    }
    return false;
  };

  emptyCart = () => {
    setState((prevState) => ({ ...prevState, cart: { items: [], total: 0 } }));
    localStorage.removeItem("cart");
  };

  addItem = (item) => {
    let { items } = state.cart;
    let foundItem = items.find((i) => i.id === item.id);
    if (!foundItem) {
      let temp = { ...item, quantity: 1 };
      let newCart = {
        items: [...items, temp],
        total: state.cart.total + item.price,
      };
      setState((prevState) => ({ ...prevState, cart: newCart }));
      localStorage.setItem("cart", encryptData(newCart));
    } else {
      let newCart = {
        items: items.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else {
            return cartItem;
          }
        }),
        total: state.cart.total + item.price,
      };
      setState((prevState) => ({ ...prevState, cart: newCart }));
      localStorage.setItem("cart", encryptData(newCart));
    }
    toast.info(
      <div>
        Added to your cart.
        <br />1 item: {item.name}
        <br />
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  removeItem = (item) => {
    const { items, total } = state.cart;
    const foundItemIndex = items.findIndex((i) => i.id === item.id);

    if (foundItemIndex !== -1) {
      const foundItem = items[foundItemIndex];
      let newItems = [];
      let newTotal = total - item.price;

      if (foundItem.quantity > 1) {
        newItems = items.map((item, index) => {
          if (index === foundItemIndex) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      } else {
        newItems = items.filter((_, index) => index !== foundItemIndex);
      }
      setState((prevState) => {
        const updatedCart = { items: newItems, total: newTotal };
        localStorage.setItem("cart", encryptData(updatedCart));       
        return {
          ...prevState,
          cart: updatedCart,
        };
      });
    }
    toast.warning(
      <div>
        Removed from your cart.
        <br />1 item: {item.name}
        <br />
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        addItem: addItem,
        removeItem: removeItem,
        emptyCart: emptyCart,
        isAuthenticated: isAuthenticated,
        user: state.user,
        setUser: setUser,
      }}
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
      <ApolloProvider client={client}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
