import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Card, CardContent, Link, Paper, Stack } from "@mui/material";
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

function EventDetail() {
  const { id } = useParams();
  
  const {
    status: eventStatus,
    data: event,
    error: eventError,
  } = useEvent(id);
  
  
  const {
    status: attendeesStatus,
    data: attendees,
    error: attendeesError,
  } = useAttendees(id)

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
        <span>Error: {eventError.message}</span>
      ) : (
        <Event {...event}  isDetail />
      )}
      {attendeesStatus === "pending" ? (
        <EventSkeleton />
      ) : attendeesStatus === "error" ? (
        <span>Error: {attendeesError.message}</span>
      ) : (
        <>
            <Card elevation={24} sx={{ width: "20rem" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Attendees
                </Typography>
                <List>
                
                  {attendees.results.length > 0 ? attendees.results.map((attendee) => (
                    <Link
                      key={attendee.id}
                      to={`/events/${id}/edit`}
                      component={NavLink}
                    >
                      <ListItem alignItems="flex-start">
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
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Link>
                  )): null}
                </List>
              </CardContent>
            </Card>
        </>
      )}
    </Stack>
  );
}

export default EventDetail;
