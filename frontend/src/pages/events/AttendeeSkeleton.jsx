import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";

function AttendeeSkeleton() {
  return (
    <List role="progressbar" aria-label="Loading attendees">
      {[1, 2, 3, 4, 5].map((i) => (
        <ListItem
          key={i}
          sx={{
            width: "100%",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Stack sx={{ width: "100%" }} direction="row">
            <ListItemAvatar>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </ListItemAvatar>
            <ListItemText
              width="100%"
              sx={{ width: "100%" }}
              primary={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="100%"
                  style={{ marginBottom: 6 }}
                />
              }
              secondary={
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="100%"
                    style={{ marginBottom: 6 }}
                  />
                </React.Fragment>
              }
            />
          </Stack>
          <Divider variant="inset" />
        </ListItem>
      ))}
    </List>
  );
}

export default AttendeeSkeleton;
