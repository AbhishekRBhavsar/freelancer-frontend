import { FormProvider, useForm, Controller, useFormContext } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from "yup";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Checkbox, FormControl, FormControlLabel, FormLabel, Slider, TextField, InputLabel, MenuItem, Select, Radio,
  RadioGroup, Button, Paper, Typography, Container, FormHelperText, Box, Input, Grid, List, ListItem, ListItemText, Link, ListItemButton, Stack, Avatar, Alert
} from "@mui/material";
import { styled } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers";

import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileDetailsQuery, useUpdateUserProfileMutation, useUploadAvatarMutation } from '../action/authService';
import { setProfile } from '../action/authSlice';

import { Navbar } from "./components";

const defaultValues = (userData) => ({
  firstName: userData?.firstName || "john",
  lastName: userData?.lastName || "",
  gender: userData?.gender || "Male",
  email: userData?.email || "",
  location: userData?.location || "",
  about: userData?.about || "",
  technology: userData?.technologies || [],
  language: userData?.languages || [],
  framework: userData?.frameworks || [],
  libAndPackage: userData?.libsAndPackages || [],
  database: userData?.databases || [],
  'project-title': userData?.projects ? userData?.projects[0]?.title : "",
  'project-details': userData?.projects ? userData?.projects[0]?.description : "",
  'org-title': userData?.experience ? userData?.experience[0]?.company : "",
  'org-job-post': userData?.experience ? userData?.experience[0]?.position : "",
  'org-description': userData?.experience ? userData?.experience[0]?.description : "",
  'org-job-start': userData?.experience ? (userData?.experience[0]?.startDate ? new Date(userData?.experience[0]?.startDate) : "") : "",
  'org-job-end': userData?.experience ? (userData?.experience[0]?.endDate ? new Date(userData?.experience[0]?.endDate) :  "") : "",
  'collage-name': userData?.education ? userData?.education[0]?.school : "",
  'degree-name': userData?.education ? userData?.education[0]?.degree : "",
  'degree-start': userData?.education ? (userData?.education[0]?.startDate ? new Date(userData?.education[0]?.startDate) : "") : "",
  'degree-end': userData?.education ? (userData?.education[0]?.endDate ? new Date(userData?.education[0]?.endDate) : "") : "",
});

const schma = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  gender: yup.string().required("Radio value is required"),
  about: yup.string().max(500, "Max 500 characters"),
});

const getImg = (str) => {
  if (!str.startsWith('http') && !str.startsWith('data:image')) {
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`
  }
  return str
}

const EditUser = () => {
  const { userProfile: profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isFetching } = useGetProfileDetailsQuery();
  const [updateUserProfile, { error: errorProfile, success }] = useUpdateUserProfileMutation();
  const [uploadAvatar, { error: avatarError }] = useUploadAvatarMutation();

  React.useEffect(() => {
    if (data) dispatch(setProfile(data.data.user));
  }, [data, dispatch]);

  // const {state} = useLocation();
  const methods = useForm({ defaultValues: defaultValues(profile), resolver: yupResolver(schma), mode: "onBlur" });
  const { handleSubmit, reset, control, setValue, formState: { errors } } = methods;

  const [picture, setPicture] = useState(profile?.picture);
  const [pictureFile, setPictureFile] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setPictureFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const saveAvatar = async => {
    const formData = new FormData();
    formData.append("avatar", pictureFile);
    uploadAvatar(formData)
    .then(() => {
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  const onSubmit = async (data) => {
    updateUserProfile(data)
    .then(() => {
      navigate('/profile');
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
  }

  if (isFetching) return (<div>Loading...</div>);

  return (
    <>
      <Navbar />
      <Container fixed sx={{ my: 2 }}>
        <Typography variant="h6"> Edit profile </Typography>
        {/* <Grid container > */}

        <Paper sx={{ p: 2, display: 'flex' }}>
          {/* <Grid item columns={2} sx={{ borderRight: 1 }}>
            list of user details to edit like personal details, education, work experiance skills
            <List>
              <ListItemButton id='personDetails-btn'>
                <ListItemText primary="Personal Details" />
              </ListItemButton>
              <ListItemButton id='skills-btn'>
                <ListItemText primary="Skills" />
              </ListItemButton>
              <ListItemButton id='education-btn'>
                <ListItemText primary="Education" />
              </ListItemButton>
              <ListItemButton id='work-experience-btn'>
                <ListItemText primary="Work Experience" />
              </ListItemButton>
            </List>
          </Grid> */}
          <Grid item columns={10}>
            <FormProvider {...methods}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
              >
                {errorProfile && <Alert severity="error">{errorProfile.message}</Alert>}
                {avatarError && <Alert severity="error">{avatarError.message}</Alert>}
                <Typography variant="h6"> Personal Details </Typography>
                <hr />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}> 
                <Box sx={{ flexShrink: 0, }}>
                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputText id="firstName" name="firstName" control={control} rules={{ required: "first name required!" }} label="First Name" />
                  </FormControl>
                  <FormControl >
                    <FormInputText id="lastName" name="lastName" control={control} label="Last Name" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputText id="email" name="email" control={control} rules={{ required: "email name required!" }} label="Email" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormLabel id="gender-lable">Gender</FormLabel>
                    <FormInputRadio id="gender" name="gender" control={control} label="Gender" rules={{ required: "gender is required" }} />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '100%' }}>
                    <FormInputTextMultiline id="About" name="about" control={control} label="about" />
                  </FormControl>
                </Grid>
                </Box>
                
                <Box sx={{ flexShrink: 1, width: '100%', height: '100%',  alignSelf: 'center' }}>
                  <FormControl style={{ width: '100%', padding: '1rem', text: 'center'}}>
                        <Avatar
                          alt={profile?.firstName}
                          src={picture ? getImg(picture.replace('=s96', '=s500')) : null}
                          sx={{ width: 200, height: 200, margin: 'auto' }}
                          />
                    <Box style={{ display: "flex", margin: '0.5rem', justifyContent: 'center'}}>
                      <Button
                        variant="contained"
                        component="label"
                        style={{ margin: '0.5rem'}}
                      >
                        Select File
                        <input
                          type="file"
                          id="upload-photo"
                          name="avatar"
                          hidden
                          onChange={(e) => {
                            handleAvatarChange(e);
                          }}
                        />
                      </Button>
                      <Button 
                        variant="contained"
                        style={{ margin: '0.5rem'}}
                        onClick={() => saveAvatar()}
                        >Save</Button>
                    </Box>
                  </FormControl>
                </Box>
                </Box>

                <Typography variant="h6"> Skills </Typography>
                <hr />
                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputMultiCheckbox id="language" name={"language"} setValue={setValue} control={control} label={"language"} defaultValue={profile["languages"]} />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl>
                    <FormInputMultiCheckbox id="framework" name={"framework"} setValue={setValue} control={control} label={"framework"} defaultValue={profile["frameworks"]}  />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputMultiCheckbox id="technology" name={"technology"} setValue={setValue} control={control} label={"technology"} defaultValue={profile["technologies"]} />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputMultiCheckbox id="libsAndPackage" name={"libsAndPackage"} setValue={setValue} control={control} label={"Libraries and packages"} defaultValue={profile["libsAndPackages"]} />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl>
                    <FormInputMultiCheckbox id="database" name={"database"} setValue={setValue} control={control} label={"Database"} defaultValue={profile["databases"]} />
                  </FormControl>
                </Grid>

                <Typography variant="h6"> Project </Typography>
                <hr />

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputText id="project-title" name="project-title" control={control} label="project Title" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputTextMultiline id="project-details" name="project-details" control={control} label="project details" />
                  </FormControl>
                </Grid>

                <Typography variant="h6"> Organization </Typography>
                <hr />

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputText id="org-title" name="org-title" control={control} label="organization name" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputText id="org-job-post" name="org-job-post" control={control} label="Job Post" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputDate id="org-job-start" name="org-job-start" control={control} label="start date" />
                  </FormControl>
                  <FormControl >
                    <FormInputDate id="org-job-end" name="org-job-end" control={control} label="end date" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputTextMultiline id="job-details" name="job-details" control={control} label="Job details" />
                  </FormControl>
                </Grid>

                <Typography variant="h6"> Education </Typography>
                <hr />

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputText id="degree-name" name="degree-name" control={control} label="Degree" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl style={{ width: '60%' }}>
                    <FormInputText id="collage-name" name="collage-name" control={control} label="Collage/School Name" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputDate id="degree-start" name="degree-start" control={control} label="start date" />
                  </FormControl>
                  <FormControl >
                    <FormInputDate id="degree-end" name="degree-end" control={control} label="end date" />
                  </FormControl>
                </Grid>

                <hr />
                <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                  save
                </Button>
                <Button onClick={() => reset()} variant={"outlined"}>
                  cancel
                </Button>
              </Box>

              {/* image upload  */}
              {/* <Avatar
                alt="Remy Sharp"
                // src='https://lh3.googleusercontent.com/a/AGNmyxa-gOBP5W6bb462x5MaZh2ryUbqB1E4S-mv5ZrM8w=s5000-c'

                sx={{ width: 200, height: 200, margin: 'auto' }}
              /> */}

            </FormProvider>
          </Grid>
        </Paper>
        {/* </Grid> */}
      </Container>
    </>
  );
};

export default EditUser;

const FormInputText = ({ name, control, label, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
        />
      )}
    />
  );
};

const FormInputTextMultiline = ({ name, control, label, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : `${value?.length || 0}/500`}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          multiline
          rows={4}
        />
      )}
    />
  );
};

const FormInputSlider = ({ name, control, setValue, label }) => {
  const [sliderValue, setSliderValue] = React.useState(0);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [sliderValue]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => (
      <Slider
        value={sliderValue}
        onChange={handleChange}
      />
    )}
  />
};


const FormInputMultiCheckbox = ({ name, control, setValue, label, defaultValue }) => {
  const selectedList = defaultValue || [];
  const [selectedItems, setSelectedItems] = useState(selectedList);

  const options = {
    language: [
      { label: "Javascript", value: "javascript" },
      { label: "Typescript", value: "typescript" },
      { label: "Python", value: "python" },
      { label: "Java", value: "java" },
      { label: "C#", value: "c#" },
      { label: "C++", value: "c++" },
      { label: "C", value: "c" },
      { label: "ruby", value: "ruby" },
      { label: "solidity", value: "solidity" },
      { label: "rust", value: "rust" },
    ],
    framework: [
      { label: "React", value: "react" },
      { label: "Angular", value: "angular" },
      { label: "Vue", value: "vue" },
      { label: "Next", value: "next" },
      { label: "Nest", value: "nest" },
      { label: "Express", value: "express" },
      { label: "Django", value: "django" },
      { label: "Flask", value: "flask" },
      { label: "Spring", value: "spring" },
      { label: "Laravel", value: "laravel" },
    ],
    technology: [
      { label: "Blockchain", value: "blockchain" },
      { label: "Web3", value: "web3" },
      { label: "WebRTC", value: "webrtc" },
      { label: "WebSockets", value: "websockets" },
      { label: "GraphQL", value: "graphql" },
      { label: "REST", value: "rest" },
      { label: "Socket.io", value: "socket.io" },
      { label: "WebAssembly", value: "webassembly" },
      { label: "WebGPU", value: "webgpu" },
      { label: "WebVR", value: "webvr" },

    ],
    libsAndPackage: [
      { label: "Redux", value: "redux" },
      { label: "JwT", value: "jwt" },
      { label: "Axios", value: "axios" },
      { label: "Lodash", value: "lodash" },
      { label: "Moment", value: "moment" },
      { label: "Ramda", value: "ramda" },
      { label: "RxJS", value: "rxjs" },
      { label: "beutifulsoup", value: "beutifulsoup" },
      { label: "pandas", value: "pandas" },
      { label: "numpy", value: "numpy" },
    ],
    database: [
      { label: "MongoDB", value: "mongodb" },
      { label: "MySQL", value: "mysql" },
      { label: "PostgreSQL", value: "postgresql" },
      { label: "SQLite", value: "sqlite" },
      { label: "Redis", value: "redis" },
      { label: "Oracle", value: "oracle" },
    ],
  };
  // we are handling the selection manually here
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);

  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel component="legend">{label}</FormLabel>

      <div>
        {options[name].map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  defaultValue={defaultValue}
                  render={({ }) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value) }
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};

const FormInputDate = ({ name, control, label }) => {
  const DATE_FORMAT = "dd-MMM-yy";
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            label={label}
          />
        )}
      />
    </LocalizationProvider>
  );

};

const FormInputDropdown = ({ name, control, label }) => {
  const options = [
    {
      label: "Dropdown Option 1",
      value: "1",
    },
    {
      label: "Dropdown Option 2",
      value: "2",
    },
  ];

  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <Select onChange={onChange} value={value}>
        {generateSelectOptions()}
      </Select>
    )}
  />
};

const FormInputRadio = ({ name, control, label }) => {
  const options = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    }
  ];
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        key={singleOption.value}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <RadioGroup row value={value} onChange={onChange} sx={{
        display: 'flex',
        mr: 2,
      }}>
        {generateRadioOptions()}
      </RadioGroup>
    )}
  />
};

