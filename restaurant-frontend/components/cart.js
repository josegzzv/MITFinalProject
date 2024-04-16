import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge, Row, Col } from "reactstrap";
import AppContext from "./context";
import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cart() {
  const { cart, addItem, removeItem, emptyCart } = useContext(AppContext);
  const router = useRouter();

  const handleClearCart = () => {
    emptyCart();
    router.push("/");
  };

  const renderItems = () => {
    return (
      <>
        {cart.items.map((item, index) => (
          <div key={item.id} className="mb-3">
            <Row className="align-items-center text-center">
              <Col xs="12" md="2" className="mb-2 mb-md-0">
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + item.image[0].url}
                  alt={item.name}
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                />
              </Col>
              <Col xs="6" md="3" className="mb-2 mb-md-0">
                <span>{item.name}</span>
              </Col>
              <Col xs="6" md="2" className="mb-2 mb-md-0">
                <span>${item.price}</span>
              </Col>
              <Col xs="6" md="2" className="mb-2 mb-md-0">
                <span>{item.quantity}x</span>
              </Col>
              <Col xs="6" md="1" className="mb-2 mb-md-0">
                <Button
                  color="link"
                  onClick={() => addItem(item)}
                  className="p-0 mx-1"
                >
                  <i className="bi bi-plus-circle"></i>
                </Button>
                <Button
                  color="link"
                  onClick={() => removeItem(item)}
                  className="p-0 mx-1"
                >
                  <i className="bi bi-dash-circle"></i>
                </Button>
              </Col>
              <Col xs="12" md="2">
                <span>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </span>
              </Col>
            </Row>
          </div>
        ))}
      </>
    );
  };

  const checkoutItems = () => (
    <div>
      <Row className="justify-content-end align-items-center mb-3">
        <Col xs="auto">
          <Badge color="light">
            <span
              style={{ fontWeight: 100, color: "gray", fontSize: "1.25rem" }}
            >
              Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span
              style={{ fontWeight: "bold", color: "black", fontSize: "1.5rem" }}
            >
              ${cart.total.toFixed(2)}
            </span>
          </Badge>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button color="secondary" onClick={handleClearCart}>
            Empty Cart
          </Button>
        </Col>
        <Col xs="auto">
          <Link href="/checkout/">
            <Button color="primary">Order</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );

  if (cart.items.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  return (
    <Card className="cart p-3">
      <CardTitle className="mb-2">
        <h5>Your Order:</h5>
      </CardTitle>
      <hr />
      <CardBody className="p-2">
        {renderItems()}
        {checkoutItems()}
      </CardBody>
    </Card>
  );
}

export default Cart;

// function Cart() {
//   const { cart, addItem, removeItem, emptyCart } = useContext(AppContext);
//   const isCartEmpty = cart.items.length === 0;
//   const router = useRouter();

//   const handleClearCart = () => {
//     emptyCart();
//     router.push('/');
//   };
//   const renderItems = () => {
//     return (
//       <>
//         <Row className="align-items-center mb-2 text-center">
//           <Col xs="2">Image</Col>
//           <Col xs="3">Dish</Col>
//           <Col xs="2">Price</Col>
//           <Col xs="2">Quantity</Col>
//           <Col xs="1">&nbsp;</Col>
//           <Col xs="2">Subtotal</Col>
//         </Row>
//         {cart.items.map((item, index) => (
//           <Row key={item.id} className="align-items-center mb-2 text-center">
//             <Col xs="2">
//               <img src={process.env.NEXT_PUBLIC_API_URL + item.image[0].url} alt={item.name} style={{ height: '50px', width: '50px', borderRadius: '50%', marginRight: '15px' }} />
//             </Col>
//             <Col xs="3">
//               <span>{item.name}</span>
//             </Col>
//             <Col xs="2">
//               <span>${item.price}</span>
//             </Col>
//             <Col xs="2">
//               <span>{item.quantity}x</span>
//             </Col>
//             <Col xs="1">
//               <Button color="link" onClick={() => addItem(item)} className="p-0 mx-1">+</Button>
//               <Button color="link" onClick={() => removeItem(item)} className="p-0 mx-1">-</Button>
//             </Col>
//             <Col xs="2">
//               <span><strong>${(item.price * item.quantity).toFixed(2)}</strong></span>
//             </Col>
//           </Row>
//         ))}
//       </>
//     );
//   };

//   const checkoutItems = () => (
//     <div>
//       <Row className="justify-content-end align-items-center mb-3">
//         <Col xs="auto">
//           <Badge color="light">
//             <span style={{ fontWeight: 100, color: "gray", fontSize: '1.25rem' }}>Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
//             <span style={{ fontWeight: 'bold', color: "black", fontSize: '1.5rem' }}>${cart.total.toFixed(2)}</span>
//           </Badge>
//         </Col>
//       </Row>
//       <Row className="justify-content-end">
//         <Col xs="auto">
//           <Button color="secondary" onClick={handleClearCart}>Empty Cart</Button>
//         </Col>
//         <Col xs="auto">
//           <Link href="/checkout/">
//             <Button color="primary">Order</Button>
//           </Link>
//         </Col>
//       </Row>
//     </div>
//   );

//   if (isCartEmpty) {
//     return <></>;
//   }

//   return (
//     <div>
//       <Card className="cart p-3">
//         <CardTitle className="mb-2">
//           <h5>Your Order:</h5>
//         </CardTitle>
//         <hr />
//         <CardBody className="p-2">
//           {renderItems()}
//           {checkoutItems()}
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

// export default Cart;
