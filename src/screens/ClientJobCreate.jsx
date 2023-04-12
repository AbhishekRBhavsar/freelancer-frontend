import { FormProvider, useForm, Controller, useFormContext } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from "yup";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Checkbox, FormControl, FormControlLabel, FormLabel, Slider, TextField, InputLabel, MenuItem, Select, Radio,
  RadioGroup, Button, Paper, Typography, Container, FormHelperText, Box, Input, Grid, List, ListItem, ListItemText, Link, ListItemButton, Stack, Avatar, Alert, IconButton,
} from "@mui/material";
import { ArrowBackIosNew } from '@mui/icons-material';

import { styled } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers";

import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileDetailsQuery } from '../action/authService';
import { useCreateJobMutation } from '../action/jobService';
import { setProfile } from '../action/authSlice';

import { Navbar } from "./components";

const defaultValues = () => ({
  title: "",
  description: "",
  location: "",
  jobType: "",
  position: "",
  skills: [],
  duration: 0,
  budget: 0,
  hourlyRate: 0,
});

const schma = yup.object().shape({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  location: yup.string().required("Job location is required"),
  jobType: yup.string().required("Job type is required"),
  position: yup.string().required("Job position is required"),
  skills: yup.array().of(yup.string()).required("Job skills is required"),
  duration: yup.number().required("Job duration is required").integer().min(1, "Job duration must be greater than 0").max(12, "Job duration must be less than 12"),
  budget: yup.number().required("Job budget is required").integer().min(1, "Job budget must be greater than 0").max(100000, "Job budget must be less than 100000"),
  hourlyRate: yup.number().required("Job hourly rate is required").integer().min(1, "Job hourly rate must be greater than 0").max(1000, "Job hourly rate must be less than 1000"),

});


const ClientJobCreate = () => {
  const { userProfile: profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isFetching } = useGetProfileDetailsQuery();
  const [createJob, { error: createJobError, success: createJobSuccess }] = useCreateJobMutation();
  // const [updateUserProfile, { error: errorProfile, success }] = useUpdateUserProfileMutation();
  // const [uploadAvatar, { error: avatarError }] = useUploadAvatarMutation();

  React.useEffect(() => {
    if (data) dispatch(setProfile(data.data.user));
  }, [data, dispatch]);

  // const {state} = useLocation();
  const methods = useForm({ defaultValues: defaultValues(), resolver: yupResolver(schma), mode: "onBlur" });
  const { handleSubmit, reset, control, setValue, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    createJob(data)
      .then(() => {
        setTimeout(() => {
          navigate('/client/jobs');
        }, 1000);
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
  }

  const handleBackClick = () => {
    navigate('/client/jobs');
  }

  if (isFetching) return (<div>Loading...</div>);

  return (
    <>
      <Navbar />
      <Container fixed sx={{ my: 2 }}>
        <Box style={{ display: "flex", alignItems: 'center' }}>
          <IconButton style={{ padding: '1rem' }} onClick={handleBackClick}>
            <ArrowBackIosNew />
          </IconButton>
          <Typography variant="h6"> Create Job </Typography>
        </Box>
        {/* <Grid container > */}

        <Paper sx={{ p: 2, display: 'flex' }}>
          <Grid item columns={10}>
            <FormProvider {...methods}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
              >
                <Typography variant="h6"> Details </Typography>
                {createJobError && <Alert severity="error">{createJobError.message}</Alert>}
                {createJobSuccess && <Alert severity="success">Job created successfully!</Alert>}
                <hr />
                {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}> */}
                  <Box sx={{ flexShrink: 0, }}>
                    <Grid sx={{
                      '& > :not(style)': { m: 1 },
                    }}>
                      <FormControl >
                        <FormInputText id="title" name="title" control={control} rules={{ required: "Title required!" }} label="Title" />
                      </FormControl>
                    </Grid>

                    <Grid sx={{
                      '& > :not(style)': { m: 1 },
                    }}>
                      <FormControl >
                        <FormInputText id="position" name="position" control={control} rules={{ required: "position name required!" }} label="Position" />
                      </FormControl>
                    </Grid>

                    <Grid sx={{
                      '& > :not(style)': { m: 1 },
                    }}>
                      <FormControl >
                        <FormLabel id="job-type-label">Job Type</FormLabel>
                        <FormInputRadio id="job-type" name="jobType" control={control} label="JobType" rules={{ required: "Job Type is required" }} />
                      </FormControl>
                    </Grid>

                    <Grid sx={{
                      '& > :not(style)': { m: 1 },
                    }}>
                      <FormControl >
                        <FormInputText id="location" name="location" control={control} rules={{ required: "location required!" }} label="Location" />
                      </FormControl>
                    </Grid>

                    <Grid sx={{
                      '& > :not(style)': { m: 1 },
                    }}>
                      <FormControl style={{ width: '100%' }}>
                        <FormInputTextMultiline id="description" name="description" control={control} label="description" />
                      </FormControl>
                    </Grid>
                    
                  </Box>
                {/* </Box> */}

                <Typography variant="h6"> Skills </Typography>
                <hr />
                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputMultiCheckbox id="skills" name={"skills"} setValue={setValue} control={control} label={"skills"} defaultValue={profile["skills"]} />
                  </FormControl>
                </Grid>

                <Typography variant="h6"> $$ </Typography>
                <hr />

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputNumber id="budget" name="budget" control={control} rules={{ required: "budget required!" }} label="Budget" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputNumber id="duration" name="duration" control={control} rules={{ required: "duration required!" }} label="Duration" />
                  </FormControl>
                </Grid>

                <Grid sx={{
                  '& > :not(style)': { m: 1 },
                }}>
                  <FormControl >
                    <FormInputNumber id="hourlyRate" name="hourlyRate" control={control} rules={{ required: "hourly rate required!" }} label="Hourly Rate" />
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
            </FormProvider>
          </Grid>
        </Paper>
        {/* </Grid> */}
      </Container>
    </>
  );
};

export default ClientJobCreate;

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

const FormInputNumber = ({ name, control, label, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              onChange(value);
            }
          }}
          value={value}
          type="number"
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
    skills: [
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
                        checked={selectedItems.includes(option.value)}
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
  // 'full-time', 'part-time', 'contract'
  const options = [
    {
      label: "Full Time",
      value: "full-time",
    },
    {
      label: "Part Time",
      value: "part-time",
    },
    {
      label: "Contract",
      value: "contract",
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

