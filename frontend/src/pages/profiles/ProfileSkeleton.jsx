
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";

const ProfileSkeleton = () => {
    return (
        <Stack
            spacing={2} p={3}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Skeleton
                sx={{ width: 100, height: 100, margin: "auto" }}
                animation="wave"
                variant="circular"
            />
            <Skeleton sx={{ height: 190, minWidth: 200, maxWidth: 250, margin: "auto" }} animation="wave" variant="rectangular" />
        </Stack>
    )
}

export default ProfileSkeleton

