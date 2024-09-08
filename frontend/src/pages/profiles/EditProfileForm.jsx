
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";
import { axiosReq } from "../../api/axiosDefaults";
import { MuiFileInput } from "mui-file-input";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";


const EditProfileForm = () => {

    const setCurrentUser = useSetCurrentUser()
    const navigate = useNavigate();
    const { id } = useParams();
    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            bio: "",
            image: "",
            
        },
    });
    const [apiErrors, setApiErrors] = useState({});
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}/`);
                if (data.is_user) {
                    setValue("bio", data.bio);
                    
                } else {
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfile();
    }, [id, navigate, getValues, setValue]);

    const onSubmit = async (submitData) => {
        const formData = new FormData();
        Object.entries({
            ...submitData,
        }).map(([key, value]) => {
            if (key === "main_image" && !value) {
                return null;
            }
            return formData.append(key, value);
        });
        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
              }));
            navigate(`/profiles/${data.id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setApiErrors(err.response?.data);
            }
        }
    };

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                    spacing={3}
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    noValidate
                    py={3}
                >
                    <Typography variant="h3">Edit Profile:</Typography>
                    <Controller
                        name="bio"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                helperText={error ? error.message : null}
                                size="small"
                                error={!!error}
                                onChange={onChange}
                                value={value}
                                fullWidth
                                label="bio"
                                variant="outlined"
                            />
                        )}
                    />
                    <FormGroup>
                        <Controller
                            name="image"
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <MuiFileInput
                                    helperText={error ? error.message : null}
                                    size="small"
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    fullWidth
                                    type="file"
                                    label="Image"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <AttachFileIcon />,
                                    }}
                                />
                            )}
                        />
                    </FormGroup>
                    

                    
                    <Button
                        variant="contained"
                        sx={{ width: "fit-content", alignSelf: "center" }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
                
            </LocalizationProvider>
        </Container>
    );
}




export default EditProfileForm
