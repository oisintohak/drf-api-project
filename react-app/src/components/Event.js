import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Event(props) {
  const {
    id,
    created_by,
    title,
    starts_at,
    ends_at,
    location,
    created_at,
    updated_at,
    is_creator,
    eventlist,
  } = props;

  const card = (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        {title && (
          <>
            <Card.Title>{title}</Card.Title>
            {created_by && <span>Created by: {created_by}</span>}
          </>
        )}

        <Card.Text>
          Details:
          {starts_at && <span>Starts at: {starts_at}</span>}
          {ends_at && <span>Ends at: {ends_at}</span>}
          {location && <span>Location: {location}</span>}
          {created_at && <span>Created: {created_at}</span>}
          {updated_at && <span>Updated: {updated_at}</span>}
        </Card.Text>
        <Button variant="primary">Link</Button>
      </Card.Body>
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
