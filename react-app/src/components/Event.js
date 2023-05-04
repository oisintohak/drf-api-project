
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
  } = props;
  return (
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
          <h3>Details:</h3>
          <ul>
            {starts_at && <li>Starts at: {starts_at}</li>}
            {ends_at && <li>Ends at: {ends_at}</li>}
            {location && <li>Location: {location}</li>}
            {created_at && <li>Created: {created_at}</li>}
            {updated_at && <li>Updated: {updated_at}</li>}
          </ul>
        </Card.Text>
        <Button variant="primary">Link</Button>
      </Card.Body>
    </Card>
  );
}

export default Event;
