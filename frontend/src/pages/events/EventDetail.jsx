import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import Event from "../../components/Event";
import EventSkeleton from "./EventSkeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useEvent from "../../queries/useEvent";
import useAttendees from "../../queries/useAttendees";
import AttendeeSkeleton from "./AttendeeSkeleton";

function EventDetail() {
  const { id } = useParams();
  const { status: eventStatus, data: event, error: eventError } = useEvent(id);

  const {
    status: attendeesStatus,
    data: attendees,
    error: attendeesError,
  } = useAttendees(id);

  return (
    <Stack
      direction="row"
      spacing={2}
      p={3}
      justifyContent="center"
      alignItems="stretch"
    >
      {eventStatus === "pending" ? (
        <EventSkeleton />
      ) : eventStatus === "error" ? (
        <Card elevation={24} sx={{ width: "20rem" }}>
          <CardContent>
            <Alert
              aria-labelledby="event_error_message"
              variant="outlined"
              severity="error"
            >
              <span id="event_error_message">
                Error loading event: {eventError.message}
              </span>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Event {...event} isDetail />
      )}
      <Card elevation={24} sx={{ width: "20rem" }}>
        <CardHeader
          title={
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Attendees
            </Typography>
          }
        />
        <CardContent>
          {attendeesStatus === "pending" ? (
            <AttendeeSkeleton />
          ) : attendeesStatus === "error" ? (
            <Alert
              aria-labelledby="attendee_error_message"
              variant="outlined"
              severity="error"
            >
              <span id="attendee_error_message">
                Error loading attendees: {attendeesError.message}
              </span>
            </Alert>
          ) : (
            <>
              {attendees.results?.length > 0 ? (
                <List>
                  {attendees.results?.map((attendee) => (
                    <ListItem key={attendee.id}>
                      <Link
                        to={`/profiles/${attendee.user_id}`}
                        component={NavLink}
                      >
                        <Stack direction="row">
                          <ListItemAvatar>
                            <Avatar
                              alt="User Profile Image"
                              src={attendee.profile_image}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={attendee.username}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    display: "inline",
                                  }}
                                >
                                  {attendee.username}
                                </Typography>
                                {attendee.bio ? attendee.bio : "this users bio"}
                              </React.Fragment>
                            }
                          />
                        </Stack>
                      </Link>
                      <Divider variant="inset" />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1">No attendees yet</Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}

export default EventDetail;
