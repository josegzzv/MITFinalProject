import React from 'react';
import { Row, Col } from 'reactstrap';

const OrderCard = ({ order }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        Order ID: {order.charge_id} - <small>{new Date(order.createdAt).toLocaleDateString()}</small>
      </div>
      <div className="card-body">
        <Row className="mb-2 text-center">
          <Col xs="2">Image</Col>
          <Col xs="3">Dish</Col>
          <Col xs="2">Price</Col>
          <Col xs="2">Quantity</Col>
          <Col xs="3">Subtotal</Col>
        </Row>
        {order.dishes.map((dish, index) => (
          <Row key={`Dish-${dish.id}-${index}`} className="align-items-center mb-2 text-center">
            <Col xs="2">
              <img src={process.env.NEXT_PUBLIC_API_URL + dish.image[0].url} alt={dish.name} style={{ height: '50px', width: '50px', borderRadius: '50%', marginRight: '15px' }} />
            </Col>
            <Col xs="3">
              <div><strong>{dish.name}</strong></div>
            </Col>
            <Col xs="2">
              <div>${dish.price}</div>
            </Col>
            <Col xs="2">
              <div>{dish.quantity}x</div>
            </Col>
            <Col xs="3">
              <div><strong>${(dish.price * dish.quantity).toFixed(2)}</strong></div>
            </Col>
          </Row>
        ))}
        <Row className="justify-content-end align-items-center mt-3">
          <Col xs="auto">
            <div className="total" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Total: ${order.amount / 100}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderCard;

