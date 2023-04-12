import { FormProvider, useForm, Controller, useFormContext } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from "yup";
import debounce from "lodash.debounce";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Checkbox, FormControl, FormControlLabel, FormLabel, Slider, TextField, InputLabel, MenuItem, Select, Radio,
  RadioGroup, Button, Paper, Typography, Container, FormHelperText, Box, Input, Grid, List, ListItem, ListItemText, Link, ListItemButton, Stack, Avatar, Alert, ButtonBase, IconButton
} from "@mui/material";
import { ArrowBackIosNew } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers";

import { useSelector, useDispatch } from 'react-redux';
import { useGetClientProfileDetailsQuery, useUpdateClientProfileMutation, useUploadAvatarMutation, useUpdateClientProjectMutation } from '../action/authService';
import { useCreateOrganizationMutation, useGetOrganizationSearchQuery, useUpdateOrganizationMutation } from '../action/jobService';
import { setProfile } from '../action/authSlice';

import { Navbar } from "./components";

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

const ClientEditProfile = () => {
  const { clientProfile: profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isFetching } = useGetClientProfileDetailsQuery();
  const [option, setOption] = useState("personal");
  // const [updateUserProfile, { error: errorProfile, success }] = useUpdateUserProfileMutation();
  // const [uploadAvatar, { error: avatarError }] = useUploadAvatarMutation();

  React.useEffect(() => {
    if (data) dispatch(setProfile(data.data.user));
  }, [data, dispatch]);

  const handleOptionClick = (event, option) => {
    setOption(option);
  }

  const handleBackClick = () => {
    navigate('/client/profile');
  }

  useEffect(() => {
  }, [option]);

  if (isFetching) return (<div>Loading...</div>);

  return (
    <>
      <Navbar />
      <Container fixed sx={{ my: 2 }}>
        <Box style={{ display: "flex", alignItems: 'center' }}>
          <IconButton style={{ padding: '1rem' }} onClick={handleBackClick}>
            <ArrowBackIosNew />
          </IconButton>
            <Typography variant="h6"> Edit profile </Typography>
        </Box>
        {/* <Grid container > */}

        <Paper sx={{ p: 2, display: 'flex' }}>
          <Grid item columns={2} sx={{ borderRight: 1, flexBasis: '10rem' }}>
            {/* list of user details to edit like personal details, education, work experiance skills */}
            <List>
              <ListItemButton id='personDetails-btn'
                onClick={(event) => handleOptionClick(event, 'personal')}
              // style={{ backgroundColor: "#9e9e9e" }}
              >
                {/* <Button variant="contained" > Personal Details </Button> */}
                <ListItemText primary="Personal Details" />
              </ListItemButton>
              <ListItemButton id='organization-btn'
                onClick={(event) => handleOptionClick(event, 'organization')}
              >
                <ListItemText primary="Organization" />
              </ListItemButton>
              <ListItemButton id='projects-btn'
                onClick={(event) => handleOptionClick(event, 'projects')}
              >
                <ListItemText primary="Projects" />
              </ListItemButton>
            </List>
          </Grid>
          <Grid item columns={10} style={{ flexGrow: 1, flexShrink: 1, margin: '1rem' }}>
            {(() => {
              switch (option) {
                case 'personal':
                  return <PersonalDetailsForm profile={profile} />
                case 'organization':
                  return <Organization profile={profile} />
                // case 'education':
                // return <EducationForm profile={profile} />
                case 'projects':
                  return <Project projects={profile?.projects} />
                default:
                  return <PersonalDetailsForm profile={profile} />
              }
            })()}

          </Grid>
        </Paper>
        {/* </Grid> */}
      </Container>
    </>
  );
};

export default ClientEditProfile;


function PersonalDetailsForm({ profile }) {
  const [updateClientProfile, { error: errorProfile, success }] = useUpdateClientProfileMutation();
  const [uploadAvatar, { error: avatarError }] = useUploadAvatarMutation();

  const [userUpdated, setUserUpdated] = useState(false);
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  // const {state} = useLocation();
  const navigate = useNavigate();
  const methods = useForm({ defaultValues: profile, resolver: yupResolver(schma), mode: "onBlur" });
  const { handleSubmit, reset, control, setValue, formState: { errors } } = methods;

  const [picture, setPicture] = useState(profile?.picture);
  const [pictureFile, setPictureFile] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatarUpdated(false);
    setUserUpdated(false);
    const file = e.target.files[0];
    setPictureFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const saveAvatar = async => {
    setUserUpdated(false);
    setAvatarUpdated(false);
    const formData = new FormData();
    formData.append("avatar", pictureFile);
    uploadAvatar(formData)
      .then(() => {
        setAvatarUpdated(true);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

  const onSubmit = async (data) => {
    setUserUpdated(false);
    setAvatarUpdated(false);
    updateClientProfile(data)
      .then(() => {
        setUserUpdated(true);
        // navigate('/profile');
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
  }

  const handleCancel = () => {
    navigate('/client/profile');
  }

  return (
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

          <Box sx={{ flexShrink: 1, width: '100%', height: '100%', alignSelf: 'center' }}>
            <FormControl style={{ width: '100%', padding: '1rem', text: 'center' }}>
              <Avatar
                alt={profile?.firstName}
                src={picture ? getImg(picture.replace('=s96', '=s500')) : null}
                sx={{ width: 200, height: 200, margin: 'auto' }}
              />
              <Box style={{ display: "flex", margin: '0.5rem', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  component="label"
                  style={{ margin: '0.5rem' }}
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
                  style={{ margin: '0.5rem' }}
                  onClick={() => saveAvatar()}
                >Save</Button>
              </Box>
            </FormControl>
          </Box>
        </Box>

        <hr />
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          save
        </Button>
        <Button onClick={handleCancel} variant={"outlined"}>
          cancel
        </Button>
        { userUpdated && <Alert severity="success">Profile updated successfully</Alert>}
        { avatarUpdated && <Alert severity="success">Avatar updated successfully</Alert>}
      </Box>

      {/* image upload  */}
      {/* <Avatar
                alt="Remy Sharp"
                // src='https://lh3.googleusercontent.com/a/AGNmyxa-gOBP5W6bb462x5MaZh2ryUbqB1E4S-mv5ZrM8w=s5000-c'

                sx={{ width: 200, height: 200, margin: 'auto' }}
              /> */}

    </FormProvider>
  )
}

function Project({ projects: defaultProject }) {
  const [updateClientProject, { error: errorProjects }] = useUpdateClientProjectMutation();
  const [projects, setProjects] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!defaultProject || defaultProject.length === 0) {
      setProjects([{ title: '', description: '' }]);
    } else {
      const newProjects = defaultProject.map((project) => {
        return {
          title: project.title,
          description: project.description,
        };
      });
      setProjects(newProjects);
    }
  }, [defaultProject]);

  const addProject = () => {
    setSuccess(false);
    if (projects.length > 0) {
      if (projects[projects.length - 1].title !== '' && projects[projects.length - 1].description !== '') {
        setProjects([...projects, { title: '', description: '' }]);
      }
    } else {
      setProjects([{ title: '', description: '' }]);
    }
  };

  const deleteProject = (index) => {
    setSuccess(false);
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleTitleChange = (event, index) => {
    const newProjects = [...projects];
    newProjects[index].title = event.target.value;
    setProjects(newProjects);
  };

  const handleDetailsChange = (event, index) => {
    const newProjects = [...projects];
    newProjects[index].description = event.target.value;
    setProjects(newProjects);
  };

  const handleProjectSubmit = (event) => {
    setSuccess(false);
    updateClientProject({ projects: projects })
      .then(() => {
        setSuccess(true);
        // navigate('/profile');
      })
      .catch((err) => {
        setSuccess(false);
        console.log("ERROR", err);
      })
  };

  return (
    <>
      <Box style={{ width: '100%' }}>
        <Typography variant="h6"> Project </Typography>
        <hr />
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          autoComplete="off"
          style={{ width: '100%' }}
        >
          {projects.map((project, index) => (
            <Box key={index}>
              <Box style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button
                  onClick={() => deleteProject(index)}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
              <Grid
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
              >
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    id={`project-title-${index}`}
                    name={`project-title-${index}`}
                    label="project Title"
                    value={project.title}
                    onChange={(event) => handleTitleChange(event, index)}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
              >
                <FormControl style={{ width: '100%' }}>
                  <TextField
                    id={`project-details-${index}`}
                    name={`project-details-${index}`}
                    label="project details"
                    value={project.description}
                    onChange={(event) => handleDetailsChange(event, index)}
                    multiline
                    rows={4}
                    required
                    inputProps={{ maxLength: 500 }}
                  />
                </FormControl>
              </Grid>
            </Box>
          ))}
          <Button variant="contained" onClick={addProject}>Add Project</Button>
          <Button variant="contained" onClick={handleProjectSubmit}>submit</Button>
          {success && <Alert severity="success">Project updated successfully</Alert>}
        </Box>
      </Box>
    </>
  );
}

function Organization({ organization: defaultOrganization }) {
  const [createOrganization, { error: errorCreate }] = useCreateOrganizationMutation();
  const [updateOrganization, { error: errorUpdate }] = useUpdateOrganizationMutation();
  const [organization, setOrganization] = useState({ name: '', about: '', image: '', location: '', website: '' });
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { data: searchResults, error: errorSearch } = useGetOrganizationSearchQuery({ search: debouncedSearchTerm, page: 1, limit: 5 });


  useEffect(() => {
    if (defaultOrganization) {
      setOrganization(defaultOrganization);
    }
  }, [defaultOrganization]);

  const handleNameChange = (event) => {
    const name = event.target.value;
    setOrganization({ ...organization, name });
  };

  const handleAboutChange = (event) => {
    const about = event.target.value;
    setOrganization({ ...organization, about });
  };

  const handleImageChange = (event) => {
    const image = event.target.value;
    setOrganization({ ...organization, image });
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setOrganization({ ...organization, location });
  };

  const handleWebsiteChange = (event) => {
    const website = event.target.value;
    setOrganization({ ...organization, website });
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleOrgClick = (org) => {
    const { name, _id } = org;
    updateOrganization({ name, id: _id })
      .then(() => {
        setSuccess(true);
        setSearchTerm('');
      })
      .catch((err) => {
        setSuccess(false);
        console.log("ERROR", err);
      });
  }

  const handleCreateOrganization = () => {
    createOrganization({ name: organization.name, about: organization.about, location: organization.location, website: organization.website })
      .then(() => {
        setSuccess(true);
        setSearchTerm('');
      })
      .catch((err) => {
        setSuccess(false);
        console.log('ERROR', err);
      })
  };

  return (
    <>
      <Box style={{ width: '100%' }}>
        <Typography variant="h6"> Organization </Typography>
        <hr />
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          autoComplete="off"
          style={{ width: '100%' }}
        >
          <Grid
            sx={{
              '& > :not(style)': { m: 1 },
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <TextField
                id="organization-name"
                name="organization-name"
                label="Organization Name"
                value={organization.name}
                onChange={(e) => {
                  handleSearchChange(e)
                  handleNameChange(e)
                }}
                required
              />
              {searchResults?.data && (
                <List style={{ marginTop: '16px' }}>
                  {searchResults?.data.map((org) => (
                    <ListItem key={org._id}>
                      <ButtonBase
                        style={{ textAlign: 'left', backgroundColor: '#bdbdbd', padding: '12px' }}
                        onClick={() => handleOrgClick(org)}
                      >
                        <ListItemText primary={org.name} style={{ color: 'Black' }} />
                      </ButtonBase>
                    </ListItem>
                  ))
                  }
                </List>)}
            </FormControl>
          </Grid>
          <Grid
            sx={{
              '& > :not(style)': { m: 1 },
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <TextField
                id="organization-about"
                name="organization-about"
                label="About"
                value={organization.about}
                onChange={handleAboutChange}
                multiline
                rows={4}
                required
                inputProps={{ maxLength: 500 }}
              />
            </FormControl>
          </Grid>
          <Grid
            sx={{
              '& > :not(style)': { m: 1 },
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <TextField
                id="organization-image"
                name="organization-image"
                label="Image URL"
                value={organization.image}
                onChange={handleImageChange}
              />
            </FormControl>
          </Grid>
          <Grid
            sx={{
              '& > :not(style)': { m: 1 },
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <TextField
                id="organization-location"
                name="organization-location"
                label="Location"
                value={organization.location}
                onChange={handleLocationChange}
              />
            </FormControl>
          </Grid>
          <Grid
            sx={{
              '& > :not(style)': { m: 1 },
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <TextField
                id="organization-website"
                name="organization-website"
                label="Website"
                value={organization.website}
                onChange={handleWebsiteChange}
              />
            </FormControl>
          </Grid>
          <Grid
            sx={{
              '& > :not(style)': { m: 1 },
            }}
          >
            {/* <FormControl style={{ width: '100%' }}>
              <TextField
                id="organization-search"
                name="organization-search"
                label="Search Organizations"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </FormControl> */}
          </Grid>
          <Button variant="contained" color="primary" onClick={handleCreateOrganization}>
            Create
          </Button>
          {success && (
            <Alert severity="success">Organization created/updated successfully!</Alert>
          )}
          {errorCreate && (
            <Alert severity="error">Failed to create organization. Please try again.</Alert>
          )}
          {/* {searchResults && (
            <List style={{ marginTop: '16px' }}>
              {searchResults.organizations.map((org) => (
                <ListItem key={org.id}>
                  <ListItemText primary={org.name} />
                </ListItem>
              ))}
            </List>
          )}
          {errorSearch && (
            <Typography variant="body1" style={{ color: 'red' }}>
              Failed to search organizations. Please try again.
            </Typography>
          )} */}
        </Box>
      </Box>
    </>
  );
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}

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

