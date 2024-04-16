import { useContext } from "react";
import AppContext from "./context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
} from "reactstrap";


function Dishes(props) {
  const { addItem } = useContext(AppContext);
 
  let searchQuery = props.dishes.filter((res) => {
    return res.name.toLowerCase().includes(props.search);
  });
  if (searchQuery.length !== 0) {
    return (
      <>
        {searchQuery.map((res) => (
          <Col xs="12" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 150, width: 150 }}
                src={process.env.NEXT_PUBLIC_API_URL + res.image[0].url}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button outline color="primary" onClick={() => addItem(res)}>
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </>
    );
  } else {
    return <h1> No Dishes</h1>;
  }
}
export default Dishes;
