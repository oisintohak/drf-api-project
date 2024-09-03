import { Avatar, Paper, Stack, Typography, MenuItem, MenuList, IconButton, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';
import ProfileSkeleton from './ProfileSkeleton';
import Link from "@mui/material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PopperPopup from '../../components/PopperPopup';



const ProfilePage = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false)
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setLoaded(false)
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`profiles/${id}/`);
        setProfile(data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile()
  }, [id]);



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
              to={`/profiles/${id}/edit`}
              component={NavLink}
              color="secondary"
            >
              Edit
            </Link>
          </MenuItem>

        </MenuList>
      }
    />
  );

  return (
    <Paper elevation={3}  sx={{margin: 3}}>
      {
        loaded ? (
          <Stack spacing={2} p={3} justifyContent='center' alignItems='center'>
            {profile?.is_user &&
              <Box component='span' sx={{position: 'relative', right: 0, top: 0, alignSelf: 'flex-end'}}>
                {popup}
              </Box>
            }
            <Avatar src={profile.image} sx={{ width: 100, height: 100, margin: "auto" }} />
            <Typography variant="h4" align="center">{profile?.username}</Typography>

          </Stack>
        ) : (
          <ProfileSkeleton />
        )
      }
    </Paper>
  )
}

export default ProfilePage