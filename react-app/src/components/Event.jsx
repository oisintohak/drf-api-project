import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
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
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosReq } from "../api/axiosDefaults";
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
    isDetail,
    main_image,
  } = props;
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
      await axiosReq.delete(`/events/${id}/`);
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };

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
            <Link
              to={`/events/${id}/edit`}
              component={NavLink}
              color="secondary"
            >
              Edit
            </Link>
          </MenuItem>
          <MenuItem>
            <Button onClick={handleClickOpen} color="secondary">
              Delete
            </Button>
            {deleteDialog}
          </MenuItem>
        </MenuList>
      }
    />
  );

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
        action={isDetail && is_creator ? popup : null}
      />
      <CardMedia
        sx={{ height: "10rem", objectFit: "contain" }}
        component="img"
        image={main_image}
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
      </CardActions>
    </Card>
  );
}

export default Event;
