import { useQuery } from "@apollo/client";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { GET_RESTAURANTS } from "../graphql/queries/getRestaurants";


function RestaurantList(props) {
  
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading){ return <p>Loading...</p>;}
  if (error){ console.log("RestaurantList.Error:", error); return <p>ERROR</p>;}
  if (!data){ console.log("RestaurantList.Not Found"); return <p>Not found</p>;}

  let searchQuery = data.restaurants.filter((res) => {
    return res.name.toLowerCase().includes(props.search);
  });

  let restId = 0;
  if (searchQuery.length !== 0) {
    restId = searchQuery[0].id;
  }

  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="12" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={process.env.NEXT_PUBLIC_API_URL + res.image[0].url}
          />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Link href={"/restaurants/" + res.id}>
              <Button color="info" onClick={() => {}}>
                {res.name}
              </Button>
            </Link>
          </div>
        </Card>
      </Col>
    ));

    return (
      <Container>
        <Row>{restList}</Row>
      </Container>
    );
  } else {
    return <h1> No Restaurants Found</h1>;
  }
}
export default RestaurantList;
