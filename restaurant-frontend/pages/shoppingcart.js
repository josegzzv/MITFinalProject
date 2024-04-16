import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router"; 
import { Row, Col } from "reactstrap";
import Link from "next/link";
import AppContext from "../components/context";
import Cart from "../components/cart";
import { toast } from "react-toastify";

function ShoppingCart() {
  const { user, cart } = useContext(AppContext);
  const isAuthenticated = user !== null && user !== undefined;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("You need to login first", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/login");
    } else if (cart.total === 0) {
      toast.info("Add a few dishes to your order! We promise you'll be delighted.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/"); 
    }
  }, [isAuthenticated, cart.total, router]);

  const message = !isAuthenticated
    ? "You need to sign in first"
    : cart.total === 0
    ? "Add a few dishes to your order! We promise you'll be delighted."
    : null;

  const showCart = isAuthenticated && cart.total > 0;

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 9, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>
          Shopping Cart
        </h1>
        <Link href="/">
          <a className="navbar-brand">Back to Restaurant List</a>
        </Link>
        {message && <div>{message}</div>}
        {showCart && <Cart isAuthenticated={isAuthenticated} />}
      </Col>
    </Row>
  );
}

export default ShoppingCart;
