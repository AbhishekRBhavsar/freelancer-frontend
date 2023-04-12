import React from "react";
import { Navbar, SkillsCard } from "./components";
import { Grid, Container, Box, Typography, Paper, CardContent, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const FAQCard = styled(Card)({
  '&:hover': {
    borderColor: '#0062cc',
    boxShadow: '1 1 1 1 rgba(0,123,255,.5)',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#b3e5fc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const FAQ = ({ user }) => {

  return (
    <>
      <Navbar />
      <Container fixed>
        <Paper style={{ borderRadius: '16px 40px' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem', marginTop: '0.5rem', borderLeft: "1rem solid #0288d1", borderRight: "1rem solid #0288d1", borderRadius: '16px 40px' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', marginLeft: '1rem' }} gutterBottom>
              Frequently asked questions
            </Typography>
          </Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} my={3} p={1}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item xs={12} sm={4} md={4} >
                {faqObject && faqObject.map((faq, index) => {
                  return (
                      <FAQCard key={index} variant="outlined" sx={{ padding: 1, margin: 1, borderLeft: "1rem solid #0288d1", borderRadius: '16px' }}>
                        <CardContent sx={{ paddingBottom: 0 }}>
                          <Typography variant="h6" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', marginLeft: '1rem', fontWeight: '580' }} gutterBottom>
                            {faq.question}
                          </Typography>
                          <Typography variant="body1" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', marginLeft: '1rem' }} gutterBottom>
                            {faq.ans}
                          </Typography>
                        </CardContent>
                      </FAQCard>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FAQ;

let faqObject = [
  {
    question: "How can I create a profile on this site?",
    ans: "You can create a profile by clicking on the 'Profile' button in the navigation bar and filling out the necessary information. You must have a Google account to sign up."
  },
  {
    question: "How can I see the jobs posted on this site?",
    ans: "You can view the jobs posted on the site by clicking on the 'Jobs' button in the navigation bar. From there, you can filter by category, location, and other criteria."
  },
  {
    question: "Can I chat with potential clients or service providers on this site?",
    ans: "Yes, you can chat with other users by clicking on their profile and sending them a message. You can also communicate through the messaging system associated with each job post."
  },
  {
    question: "Is there a way to rate or review clients or service providers?",
    ans: "At this time, we do not have a rating or review system in place. However, we may implement one in the future to help users make more informed decisions."
  },
  {
    question: "How do I edit my profile information?",
    ans: "You can edit your profile information by clicking on the 'Profile' button in the navigation bar and selecting 'Edit Profile'. From there, you can update your personal and professional information."
  },
  {
    question: "Are there any fees associated with using this site?",
    ans: "Currently, we do not support payments or charge any fees for using the site. However, we may implement payment processing in the future for job postings or other services."
  },
  {
    question: "Can I delete my account if I no longer want to use this site?",
    ans: "Yes, you can delete your account by clicking on the 'Profile' button in the navigation bar, selecting 'Edit Profile', and clicking the 'Delete Account' button at the bottom of the page."
  },
  {
    question: "How do I search for specific jobs or services on this site?",
    ans: "You can use the search bar on the Jobs page to look for specific jobs or services. You can also filter by category, location, and other criteria to narrow down your search results."
  },
  {
    question: "Is there a limit to the number of jobs I can post or apply for on this site?",
    ans: "No, there is no limit to the number of jobs you can post or apply for on this site. However, we do ask that users do not spam the site with irrelevant or inappropriate postings."
  },
  {
    question: "What should I do if I encounter a problem or issue while using this site?",
    ans: "If you encounter any problems or issues while using this site, please contact our support team through the contact form on our website. We will do our best to address your concerns as quickly as possible."
  },
  {
    question: "How can we invite friends? is there any reword for inviting others?",
    ans: "you can invite friedns from 'INVITE' in navbar and send mail to friend. as for reward system we are not giving right now. but when in near future we implement reward system, that time past user who have invited other will definately get rewards."
  },
];
