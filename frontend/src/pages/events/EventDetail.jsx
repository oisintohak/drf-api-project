import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Card, CardContent, Link, Paper, Stack } from "@mui/material";
import Event from "../../components/Event";
import { axiosReq } from "../../api/axiosDefaults";
import EventSkeleton from "./EventSkeleton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [attendees, setAttendees] = useState({ results: [] })
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: event }, { data: attendees }] = await Promise.all([
          axiosReq.get(`events/${id}/`),
          axiosReq.get(`events/event-attendees/?event=${id}`),
        ]);
        const { data } = await axiosReq.get(`events/event-attendees/?event=${id}`)
        console.log(data)
        // console.log(attendees.results)
        setEvent({ results: [event] });
        setAttendees(data);

        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(attendees)

  }, [attendees])


  return (
    <Paper elevation={3} sx={{ margin: 3 }}>
      <Stack direction='row' spacing={2} p={3} justifyContent='center' alignItems='center'>
        {loaded ? (
          <>
            <Event {...event.results[0]} setEvents={setEvent} isDetail />
            {
              attendees.results.length > 0 &&
              <Card sx={{ width: '20rem' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Attendees
                  </Typography>
                  <List>
                    {attendees.results.map((attendee) => (
                      <Link
                        to={`/events/${id}/edit`}
                        component={NavLink}
                        color="secondary"
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="User Profile Image" src={attendee.profile_image} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={attendee.username}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                  {attendee.username}
                                </Typography>
                                {attendee.bio ? attendee.bio : 'this users bio'}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </Link>
                    ))}
                  </List>
                </CardContent>
              </Card>
            }
          </>
        ) : (
          <EventSkeleton />
        )}
      </Stack>
    </Paper>
  );
}

export default EventDetail;
