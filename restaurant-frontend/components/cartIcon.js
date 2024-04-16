import React, { useContext } from "react";
import { Badge, Button } from "reactstrap";
import { FaShoppingCart } from "react-icons/fa"; 
import AppContext from "./context"; 

const CartIcon = () => {
  const { cart } = useContext(AppContext); 

  try {
    const itemCount =
      cart && cart.items
        ? cart.items.reduce((total, item) => total + item.quantity, 0)
        : 0;

    if(itemCount===null || itemCount===undefined){
      return(<></>);
    }

    return (
      <>
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* relative container */}
          <Button color="primary">
            <FaShoppingCart />
          </Button>
          {itemCount > 0 && (
            <Badge
              color="secondary"
              pill
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(30%, -10%)",
              }}
            >
              <span>{itemCount}</span>
            </Badge>
          )}
        </div>
      </>
    );
  } catch (error) {
    return <></>;
  }
};

export default CartIcon;
