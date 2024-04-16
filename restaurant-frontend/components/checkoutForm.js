import React, { useState, useContext } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import fetch from "isomorphic-fetch";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "./cardSection";
import AppContext from "./context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { decryptData } from "../utils/encrypt";

function CheckoutForm(props) {
  const [data, setData] = useState({
    address: "",
    city: "",
    state: "",
    stripe_id: "",
  });
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    state: "",
    card: "",
  });
  const [error, setError] = useState("");
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { cart, emptyCart, user } = useContext(AppContext);

  function onChange(e) {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    let fieldError = '';
    if (name === 'address' && value.length < 5) {
        fieldError = 'Address too short.';
    } else if (name === 'city' && value.length < 4) {
        fieldError = 'City too short.';
    } else if (name === 'state' && value.length < 2) {
        fieldError = 'State?';
    }
    setErrors({ ...errors, [name]: fieldError });
}

  const validateFields = () => {
    let isValid = true;
    let newErrors = { address: "", city: "", state: "", card: "" };

    if (data.address.length < 5) {
      newErrors.address = "Address too short.";
      isValid = false;
    }
    if (data.city.length < 4) {
      newErrors.city = "City too short.";
      isValid = false;
    }
    if (data.state.length < 2) {
      newErrors.state = "State?";
      isValid = false;
    }
    if (!isCardComplete) {
      newErrors.card = "*Required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  async function submitOrder(event) {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    setIsAddressComplete(true);
    const cardElement = elements.getElement(CardElement);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    let datos = {},
      respuesta = {};
    const token = await stripe.createToken(cardElement);
    const userToken = decryptData(user.token); 
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: userToken && { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        amount: Number(Math.round(cart.total + "e2") + "e-2"),
        dishes: cart.items,
        address: data.address,
        city: data.city,
        state: data.state,
        token: token.token.id,
        error: {},
        catchResponse: {},
      }),
    })
      .then((response) => {
        respuesta = response;
        return response.json();
      })
      .then((data) => {
        datos = data;
      })
      .catch((error) =>
        console.error("fetch error:", error)
      );

    if (!respuesta.ok) {
      toast.error(
        <div>
          Payment error.
          <br />
          Error Code: {datos.code}
          <br />
          <br />
          Bank Message: {datos.error.message}
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setIsAddressComplete(false);
    } else {
      toast.success(
        <div>
          Order created successfully.
          <br />
          Code: {respuesta.status}-{respuesta.statusText}
          <br />
          <br />
          Charge Id: {datos.charge_id}
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          onClose: () => {
            emptyCart();
          },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }

  return (
    <div className="paper" style={{ margin: 0 }}>
      <h5>Your information:</h5>
      <hr />
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.90", marginRight: 10 }}>
          <Label>Address</Label>
          {errors.address && (
            <span className="text-danger">&nbsp;&nbsp;{errors.address}</span>
          )}
          <Input
            disabled={isAddressComplete}
            name="address"
            onChange={onChange}
          />
        </div>
      </FormGroup>
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.65", marginRight: "6%" }}>
          <Label>City</Label>
          {errors.city && (
            <span className="text-danger">&nbsp;&nbsp;{errors.city}</span>
          )}
          <Input disabled={isAddressComplete} name="city" onChange={onChange} />
        </div>
        <div style={{ flex: "0.25", marginRight: 0 }}>
          <Label>State</Label>
          {errors.state && (
            <span className="text-danger">&nbsp;{errors.state}</span>
          )}
          <Input
            disabled={isAddressComplete}
            name="state"
            onChange={onChange}
          />
        </div>
      </FormGroup>

      <CardSection
        cartTotal={props.cartTotal}
        data={data}
        stripeError={error}
        errors={errors}
        submitOrder={submitOrder}
        setIsCardComplete={setIsCardComplete}
        isCardComplete={isCardComplete}
        isAddressComplete={isAddressComplete}
      />

      <style jsx global>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            height: 550px;
            padding: 30px;
            background: #fff;
            border-radius: 6px;
            margin-top: 90px;
          }
          .form-half {
            flex: 0.5;
          }
          * {
            box-sizing: border-box;
          }
          body,
          html {
            background-color: #f6f9fc;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          h1 {
            color: #32325d;
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }
          .Checkout {
            margin: 0 auto;
            max-width: 800px;
            box-sizing: border-box;
            padding: 0 5px;
          }
          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            color: #fff;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            background-color: #6772e5;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }
          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }
          button:hover {
            color: #fff;
            cursor: pointer;
            background-color: #7795f8;
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
              0 3px 6px rgba(0, 0, 0, 0.08);
          }
          input,
          .StripeElement {
            display: block;
            background-color: #f8f9fa !important;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
              rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }
          input::placeholder {
            color: #aab7c4;
          }
          input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
              rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }
          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}
export default CheckoutForm;
