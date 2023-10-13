import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Divider, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";

const Event = (props) => {
  const {
    id,
    creator_username,
    title,
    starts_at,
    ends_at,
    address,
    created_at,
    updated_at,
    is_creator,
    eventlist,
    profile_image,
    isDetail,
    showEdit,
  } = props;
  return (
    <Card sx={{ maxWidth: "20rem" }}>
      <CardHeader
        avatar={<Avatar src={profile_image} />}
        title={
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {title}
          </Typography>
        }
        subheader={
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {creator_username}
          </Typography>
        }
      />
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {address}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Typography variant="body2">Starts at:{starts_at}</Typography>
          <Typography variant="body2">Ends at:{ends_at}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        {!isDetail && (
          <Link to={`/events/${id}`} component={NavLink} color="secondary">
            <Button size="small">Learn More</Button>
          </Link>
        )}
        {showEdit && (
          <Link to={`/events/${id}/edit`} component={NavLink} color="secondary">
            <Button size="small">Edit</Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default Event;
