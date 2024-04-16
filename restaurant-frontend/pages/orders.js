import React, { useContext } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import AppContext from "../components/context";
import { GET_USER_ORDERS } from "../graphql/queries/getUserOrders";
import OrderCard from "../components/orderCard";
import { decryptData } from "../utils/encrypt";

const OrdersPage = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <div className="container mt-5">
        <h1 className="mb-4">My Orders</h1>
        <Link href="/">
          <a className="navbar-brand">Back to Restaurant List</a>
        </Link>
        <div className="alert alert-info">You need to login first.</div>
      </div>
    );
  }

  const { loading, error, data } = useQuery(GET_USER_ORDERS, {
    variables: { userId: user.id },
    context: {
      headers: {
        Authorization: `Bearer ${decryptData(user.token)}`,
      },
    },
  });

  if (loading) {
    console.log("Orders.Cargando");
    return (
      <div className="text-center my-5">
        <strong>Loading...</strong>
      </div>
    );
  }
  if (error) {
    console.log("Orders.Error:", error);
    return (
      <div className="text-center my-5">
        <strong>An error has occurred, please try again later.</strong>
      </div>
    );
  }

  if (!data) {
    console.log("Orders.No Data");
    return <div className="alert alert-info">No orders.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Orders</h1>
      <Link href="/">
        <a className="navbar-brand">Back to Restaurant List</a>
      </Link>
      {data.orders.length > 0 ? (
        data.orders.map((order, index) => (
          <OrderCard key={`OrderCard-${index}`} order={order} />
        ))
      ) : (
        <div className="alert alert-info">No orders.</div>
      )}
    </div>
  );
};

export default OrdersPage;
