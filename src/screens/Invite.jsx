import React from "react";
import { Navbar, SkillsCard } from "./components";
import { Grid, Container, Box, Typography, Paper, Alert, Card, TextField, FormControl, Button } from '@mui/material';
import { useForm, FormProvider, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useCreateInviteMutation } from '../action/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Invite = ({ user }) => {

  const { handleSubmit, control } = useForm({ defaultValues: { email: "" }, resolver: yupResolver(schema) });
  const [emailsent, setEmailSent] = React.useState(false);

  const [createInvite, { error: emailSendError, success }] = useCreateInviteMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Send email as payload
    createInvite(data)
      .then((res) => {
        setEmailSent(true);
      }).catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    setTimeout(() => {
      setEmailSent(false);
    }, 5000);
  }, [emailsent]);

  return (
    <>
      <Navbar />
      <Container fixed>
        <Paper style={{ borderRadius: '16px 40px' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem', marginTop: '0.5rem', borderLeft: "1rem solid #0288d1", borderRight: "1rem solid #0288d1", borderRadius: '16px 40px' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', marginLeft: '1rem' }} gutterBottom>
              Referal Program
            </Typography>
          </Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} my={3} p={1}>
            <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem', marginTop: '2rem', backgroundColor: '#f5f5f5', border: "1px solid #cccccc", borderRadius: '16px', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Get rewarded for referring your friends and family!
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', textAlign: 'center' }} gutterBottom>
                Share your friends and family email and invite them to join our platform. The more people you refer, the greater your chances of unlocking exclusive rewards and perks in the future. Thank you for being a part of our community!
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={12} sm={4} md={4} >

                  {/* form  */}
                  <FormProvider>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid sx={{
                        '& > :not(style)': { m: 1 },
                        'display': 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <FormControl >
                          <FormInputText id="email" name="email" rules={{ required: "Email is required!" }} label="Email" control={control} />
                        </FormControl>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#0288d1', marginTop: '10px' }}>Submit</Button>
                      </Grid>
                    </form>
                  </FormProvider>
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>
                Thank You!
              </Typography>
              {emailSendError && <Alert severity="error">Email send error</Alert>}
              {emailsent && <Alert severity="success">Invitation Email sent successfully</Alert>}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Invite;

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
          value={value} // use value prop instead of defaultValue
          fullWidth
          label={label}
        />
      )}
    />
  );
};