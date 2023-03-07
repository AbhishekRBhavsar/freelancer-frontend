import React from "react";
import { makeStyles } from "@mui/material/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
    margin: theme.spacing(1),
  },
}));

const Chat = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            Profile
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            autoComplete="tel"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} required>
            <InputLabel>Experience</InputLabel>
            <Select id="experience" name="experience">
              <MenuItem value="1-3">1-3 years</MenuItem>
              <MenuItem value="3-5">3-5 years</MenuItem>
              <MenuItem value="5+">5+ years</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} required>
            <InputLabel>Skill Set</InputLabel>
            <Select
              id="skillset"
              name="skillset"
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Node.js">Node.js</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Ruby">Ruby</MenuItem>
              <MenuItem value="Swift">Swift</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I have read and agree to the Terms and Conditions"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
