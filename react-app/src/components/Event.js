import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

const card1 = (
  <Card>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text></Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
);

function Event(props) {
  const {
    id,
    created_by,
    title,
    starts_at,
    ends_at,
    address,
    created_at,
    updated_at,
    is_creator,
    eventlist,
  } = props;

  const card = (
    <Card>
      <Card.Img variant="top" src="" />
      <Card.Body>
        {title && (
          <>
            <Card.Title>{title}</Card.Title>
            {created_by && <span>Created by: {created_by}</span>}
          </>
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        {starts_at && <ListGroup.Item>Starts at: {starts_at}</ListGroup.Item>}
        {ends_at && <ListGroup.Item>Ends at: {ends_at}</ListGroup.Item>}
        {address && <ListGroup.Item>Address: {address}</ListGroup.Item>}
        {created_at && <ListGroup.Item>Created: {created_at}</ListGroup.Item>}
        {updated_at && <ListGroup.Item>Updated: {updated_at}</ListGroup.Item>}
      </ListGroup>
      <Button>Details</Button>
    </Card>
  );

  return (
    <div>
      {eventlist ? (
        <Link key={id} to={`/events/${id}`}>
          {card}
        </Link>
      ) : (
        card
      )}
    </div>
  );
}

export default Event;
