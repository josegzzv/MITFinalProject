import React, { useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import AppContext from "../components/context";
import { toast } from "react-toastify";

function Checkout() {
  // get app context
  const { user, cart, stripe } = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const stripekey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const isAuthenticated = user !== null && user !== undefined;
  const router = useRouter();
  // const message = !isAuthenticated
  //   ? "You need to sign in first"
  //   : cart.total === 0
  //   ? "Add a few dishes to your order! We promise you'll be delighted."
  //   : null;
  // const showCheckout = isAuthenticated && cart.total > 0;
  // load stripe to inject into elements components
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

  // useEffect(() => {
  //   // This ensures the redirection only happens client-side
  //   if (cart.total === 0 && isAuthenticated) {
  //     router.push("/");
  //   }
  // }, [cart.total, isAuthenticated, router]);

  const stripePromise = loadStripe(stripekey);
  const message =
    isAuthenticated && cart.total === 0
      ? "Add a few dishes to your order! We promise you'll be delighted."
      : null;
  const showCheckout = isAuthenticated && cart.total > 0;

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 9, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Link href="/">
          <a className="navbar-brand">Back to Restaurant List</a>
        </Link>
        {message && <div>{message}</div>}
        {showCheckout && (
          <Elements stripe={stripePromise}>
            <CheckoutForm cartTotal={cart.total} />
          </Elements>
        )}
      </Col>
    </Row>
  );
}
export default Checkout;
