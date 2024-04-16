import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : "");
    props.setIsCardComplete(event.complete);
  };

  return (
    <div>
      <label htmlFor="card-element">Credit or debit card</label>{((!props.isCardComplete || cardError) && props.errors.card)  && <span className="text-danger">&nbsp;&nbsp;{props.errors.card}</span>}
      <CardElement
        options={{
          style: { base: { fontSize: "18px" } },
        }}
        onChange={handleCardChange} 
      />
            {cardError && <div className="text-danger mt-2">{cardError}</div>}
      <br />
      <div className="order-button-wrapper">
        <button
          onClick={props.submitOrder}
          disabled={props.isAddressComplete && props.isCardComplete} 
        >
          { props.isAddressComplete ? "Processing Payment..." : "Confirm order for: $" + props.cartTotal}
        </button>
      </div>
      {props.stripeError && (
        <div className="text-danger">
          {props.stripeError.toString()}
        </div>
      )}
      <style jsx>
        {`
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}
      </style>
    </div>
  );
}

export default CardSection;



