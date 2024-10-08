import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Badge,
  CardHeader,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import PopperPopup from "./PopperPopup";

function Event(props) {
  const {
    id,
    creator_username,
    title,
    starts_at,
    ends_at,
    address,
    profile_image,
    is_creator,
    favourite_id,
    attendee_id,
    favourite_count,
    attendee_count,
    isDetail,
    main_image,
    setEvents
  } = props;
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavourite = async () => {
    try {
      const { data } = await axiosRes.post("events/event-favourites/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? { ...event, favourite_id: data.id, favourite_count: event.favourite_count + 1 }
            : event;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfavourite = async () => {
    try {
      await axiosRes.delete(`events/event-favourites/${favourite_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? { ...event, favourite_id: null, favourite_count: event.favourite_count - 1 }
            : event;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttend =  async () => {
    console.log('handleAttend')
    try {
      const { data } = await axiosRes.post("events/event-attendees/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
          ? { ...event, attendee_id: data.id, attendee_count: event.attendee_count + 1 }
          : event;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  }
  const handleUnattend = async () => {
    console.log('handleUnattend')
    try {
      await axiosRes.delete(`events/event-attendees/${attendee_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? { ...event, attendee_id: null, attendee_count: event.attendee_count -1 }
            : event;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  }


  const deleteDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete this event?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The event will be permanently deleted. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  const popup = (
    <PopperPopup
      button={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      popup={
        <MenuList>
          <MenuItem>
            <Button
              to={`/events/${id}/edit`}
              component={NavLink}
              
            >
              Edit
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={handleClickOpen} >
              Delete
            </Button>
            {deleteDialog}
          </MenuItem>
        </MenuList>
      }
    />
  );

  return (
    <Card elevation={24} sx={{ maxWidth: isDetail? "20rem": "unset" }}>
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
        action={isDetail && is_creator ? popup : null}
      />
      <CardMedia
        sx={{ height: "10rem", objectFit: "cover" }}
        component="img"
        image={main_image || 'default.jpg'}
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
          <Link to={`/events/${id}`} component={NavLink} >
            <Button  size="small">Details</Button>
          </Link>
        )}{
          currentUser && !is_creator && (<>
            {favourite_id ? (
              <IconButton
                onClick={handleUnfavourite}
              >
                <Badge badgeContent={favourite_count} color="primary">
                <FavoriteIcon sx={{color: 'pink'}} />
                </Badge>
              </IconButton>
            ) : (
              <IconButton
                onClick={handleFavourite}
              >
                <Badge badgeContent={favourite_count} color="primary">
                <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            )}
          </>
          )}
        {
          currentUser && (
            <>
              {attendee_id ? (
                <IconButton onClick={handleUnattend} >
                <Badge badgeContent={attendee_count} color="primary">
                  <EventAvailableIcon color='success' />
                  </Badge>
                </IconButton>
              ) : (
                <IconButton onClick={handleAttend} >
                <Badge badgeContent={attendee_count} color="primary">
                  <EventAvailableIcon />
                  </Badge>
                </IconButton>
              )}
            </>
          )
        }
      </CardActions>
    </Card>
  );
}

export default Event;
