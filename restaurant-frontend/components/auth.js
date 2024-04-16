import { useContext, useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import { encryptData, decryptData } from "../utils/encrypt";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const registerUser = (username, email, password, appContext) => {
  let authUser = { username: "", email: "", token: "", id:"" };
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        authUser.username = res.data.user.username;
        authUser.email = res.data.user.email;
        authUser.token = encryptData(res.data.jwt);
        authUser.id=res.data.user._id;
        appContext(authUser);
        resolve(res);
        Router.push("/");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const login = (identifier, password, appContext) => {
  let authUser = { username: "", email: "", token: "", id:"" };
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        authUser.username = res.data.user.username;
        authUser.email = res.data.user.email;
        authUser.token = encryptData(res.data.jwt);
        authUser.id=res.data.user._id;
        appContext(authUser);
        resolve(res);
        Router.push("/");
      })
      .catch((error) => {
        console.log("Strapi Error:",error);
        reject(error);
      });
  });
};

export const loginWithGoogle = async (accessToken, setUser) => {
  try {
    const { data } = await axios.get(`${API_URL}/auth/google/callback?access_token=${accessToken}`);
    let newUser = { ...data.user, token: data.jwt };
    newUser.token=encryptData(data.jwt);
    setUser(newUser); 
    Router.push('/'); 
  } catch (error) {
    console.error('Error en el login con Google:', error.response?.data?.message);
    throw error; 
  }
};

export const checkTokenValidity = async (encryptedUserToken) => {
  let token = null; 
  if (!token && encryptedUserToken) {
    try {
      token = decryptData(encryptedUserToken);
    } catch (error) {
      console.error("Token error", error);
      return false;
    }
  }
  if (!token) {
    return false;
  }
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return Boolean(response.data);
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  Router.push("/");
};

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
