import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import AppContext from "./context";
import CartIcon from "./cartIcon";
import LoadingSpinner from "./loadingSpinner";
import { logout } from "./auth";

const Layout = (props) => {
  const title = "Welcome to MIT FullStackDeveloper Restaurant APP";
  const { user, emptyCart, setUser } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuLogout = () => {
    setUser(null);
    logout();
    emptyCart();
  };
  const [isClientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);  
  }, []);
  
  if (!isClientReady) {
    return <LoadingSpinner />; 
  }


  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3"></script>
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">JAG Restaurant APP</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            <Link href="/shoppingcart">
              <a className="nav-link">
                <CartIcon />
              </a>
            </Link>
          </NavItem>
          {user ? (
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle nav caret>
                {user.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Logged in as {user.username}</DropdownItem>
                <DropdownItem>
                  <Link href="/orders">
                    <a className="nav-link" style={{ color: "#16181b" }}>
                      My orders
                    </a>
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={menuLogout}>
                  <Link href="/">
                    <a className="nav-link" style={{ color: "#16181b" }}>
                      Logout
                    </a>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavItem>
                <Link href="/register">
                  <a className="nav-link"> Sign up</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/login">
                  <a className="nav-link">Sign in</a>
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
