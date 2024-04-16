import { useRouter } from "next/router";
import Link from "next/link";
import Dishes from "../../components/dishes";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_RESTAURANT_DETAILS } from "../../graphql/queries/getRestaurantDetails";

import {
  Container,
  Row,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";


const RestaurantDetail = () => {
  const router = useRouter();
  let { restaurantId } = router.query;
  const [dishQuery, setdishQuery] = useState("");

  if (!restaurantId) {
    return <p>Loading...</p>;
  }

  const { loading, error, data } = useQuery(GET_RESTAURANT_DETAILS, {
    variables: { id: restaurantId },
  });

  const renderDishes = (dishes) => {
    return (
      <Dishes dishes={dishes} search={dishQuery} />
    );
  };
  if (loading){ console.log("[restaurantId] Dishes List.Cargando"); return <p>Loading...</p>;}
  if (error){ console.log("[restaurantId] Dishes List.Error:", error); return <p>Please select a restaurant to show available dishes</p>;}
  if (!data){ console.log("[restaurantId] Dishes List.Not Found"); return <p>Not found</p>;}

  let restaurant = data.restaurant;

  if (
    restaurantId !== 0 &&
    restaurantId !== null &&
    restaurantId !== undefined
  ) {
    return (
      <>
        <Container>
          <div className="search">
            <h1>{restaurant.name}</h1>
            <InputGroup>
              <InputGroupAddon addonType="append"> Search </InputGroupAddon>
              <Input
                onChange={(e) =>
                  setdishQuery(e.target.value.toLocaleLowerCase())
                }
                value={dishQuery}
              />
            </InputGroup>
            <br></br>
          </div>
          <Link href="/">
            <a className="navbar-brand">Back to Restaurant List</a>
          </Link>
          <Row>{renderDishes(restaurant.dishes)}</Row>
        </Container>
      </>
    );
  } else {
    return <h1> No Dishes</h1>;
  }
};
export default RestaurantDetail;
