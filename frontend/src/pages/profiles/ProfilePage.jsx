import { Avatar, Box, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';
import ProfileSkeleton from './ProfileSkeleton';

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
  return (
    <Paper elevation={3}>
      {
        !loaded ? (
          <Stack spacing={2} p={3}>
            <Avatar sx={{ width: 100, height: 100, margin: "auto" }} />
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