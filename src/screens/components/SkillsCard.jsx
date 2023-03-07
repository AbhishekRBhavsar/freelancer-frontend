import { useState } from "react";
import {
  CardContent,
  Typography,
  Modal,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  EditOutlined,
  LocationOnOutlined,
  CodeOutlined,
  ExtensionOutlined,
  BuildOutlined,
  PeopleOutlined,
  StorageOutlined,
  DevicesOutlined,
} from "@mui/icons-material";

// import {
//   CardContent,
//   Typography,
//   Modal,
//   Box,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   ListItemButton,
//   Divider,
//   Checkbox,
// } from "@mui/material";
// import {
//   EditOutlined,
//   LocationOnOutlined,
//   CodeOutlined,
//   ExtensionOutlined,
//   BuildOutlined,
//   PeopleOutlined,
//   StorageOutlined,
//   DevicesOutlined,
// } from "@mui/icons-material";
import { makeStyles, ThemeProvider } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SkillsCard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={classes}>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <IconButton aria-label="edit" size="small" onClick={handleOpen}>
          <EditOutlined />
        </IconButton>
      </Box>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="skills-modal-title"
        aria-describedby="skills-modal-description"
      >
        <Box 
        className={classes.paper}
        >
          <Typography id="skills-modal-title" variant="h6" component="h2" gutterBottom>
            Edit Skills
          </Typography>
          <Divider />
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItemButton>
              <ListItemIcon>
                <CodeOutlined />
              </ListItemIcon>
              <ListItemText primary="Programming Languages" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ExtensionOutlined />
              </ListItemIcon>
              <ListItemText primary="Frameworks & Technologies" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <StorageOutlined />
              </ListItemIcon>
              <ListItemText primary="Databases" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BuildOutlined />
              </ListItemIcon>
              <ListItemText primary="Tools" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PeopleOutlined />
              </ListItemIcon>
              <ListItemText primary="Specialization" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DevicesOutlined />
              </ListItemIcon>
              <ListItemText primary="Platforms & Services" />
            </ListItemButton>
          </List>
        </Box>
      </Modal>
    </CardContent>
    </ThemeProvider>
  );
};

// const SkillsCard = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [programmingLanguages, setProgrammingLanguages] = useState([
//     { name: "Java", checked: false },
//     { name: "JavaScript", checked: false },
//     { name: "Python", checked: false },
//     { name: "C++", checked: false },
//     { name: "C#", checked: false },
//     { name: "Go", checked: false },
//     { name: "Kotlin", checked: false },
//     { name: "Ruby", checked: false },
//   ]);

//   const [frameworksAndTechnologies, setFrameworksAndTechnologies] = useState([
//     { name: "React", checked: false },
//     { name: "Vue", checked: false },
//     { name: "Angular", checked: false },
//     { name: "Node.js", checked: false },
//     { name: "Express.js", checked: false },
//     { name: "Django", checked: false },
//     { name: "Ruby on Rails", checked: false },
//     { name: "Spring", checked: false },
//     { label: "Flask", checked: false },
//   ]);

//   const [databases, setDatabases] = useState([
//     { name: "MySQL", checked: false },
//     { name: "PostgreSQL", checked: false },
//     { name: "MongoDB", checked: false },
//     { name: "Redis", checked: false },
//     { name: "Oracle", checked: false },
//     { name: "Amazon RDS", checked: false },
//     { label: "Cassandra", checked: false },
//     { label: "Firebase", checked: false },
//     { label: "DynamoDB", checked: false },
//     { label: "SQLite", checked: false },
//   ]);

//   const [tools, setTools] = useState([
//     { label: "Git", checked: false },
//     { label: "Docker", checked: false },
//     { label: "Jenkins", checked: false },
//     { label: "VS Code", checked: true },
//     { label: "IntelliJ IDEA", checked: false },
//     { label: "PyCharm", checked: false },
//     { label: "Postman", checked: false },
//     { label: "Jira", checked: false },
//     { label: "Trello", checked: false },
//   ]);

//   const [specializations, setSpecializations] = useState([
//     { label: "Web Development", checked: true },
//     { label: "Mobile Development", checked: false },
//     { label: "Data Science", checked: false },
//     { label: "Machine Learning", checked: false },
//     { label: "Cloud Computing", checked: false },
//     { label: "DevOps", checked: false },
//     { label: "UI/UX Design", checked: false },
//     { label: "Game Development", checked: false },
//     { label: "Blockchain", checked: false },
//     { name: "Full Stack Development", checked: false },
//   ]);

//   const [platformsAndServices, setPlatformsAndServices] = useState([
//     { name: "Amazon Web Services", checked: false },
//     { name: "Microsoft Azure", checked: false },
//     { name: "Google Cloud Platform", checked: false },
//     { name: "Firebase", checked: false },
//     { name: "Heroku", checked: false },
//     { name: "DigitalOcean", checked: false }
//   ]);

//   // const handleLanguagesChange = (event) => {
//   //   const { value } = event.target;
//   //   setSelectedLanguages(
//   //     value !== "" ? [...selectedLanguages, value] : selectedLanguages.filter((v) => v !== value)
//   //   );
//   // };

//   // const handleFrameworksChange = (event) => {
//   //   const { value } = event.target;
//   //   setSelectedFrameworks(
//   //     value !== "" ? [...selectedFrameworks, value] : selectedFrameworks.filter((v) => v !== value)
//   //   );
//   // };

//   // const handleDatabasesChange = (event) => {
//   //   const { value } = event.target;
//   //   setSelectedDatabases(
//   //     value !== "" ? [...selectedDatabases, value] : selectedDatabases.filter((v) => v !== value)
//   //   );
//   // };

//   // const handleToolsChange = (event) => {
//   //   const { value } = event.target;
//   //   setSelectedTools(
//   //     value !== "" ? [...selectedTools, value] : selectedTools.filter((v) => v !== value)
//   //   );
//   // };

//   // const handleSpecializationChange = (event) => {
//   //   const { value } = event.target;
//   //   setSelectedSpecialization(
//   //     value !== "" ? [...selectedSpecialization, value] : selectedSpecialization.filter((v) => v !== value)
//   //   );
//   // };

//   // const handlePlatformsChange = (event) => {
//   //   const { value } = event.target;
//   //   setSelectedPlatforms(
//   //     value !== "" ? [...selectedPlatforms, value] : selectedPlatforms.filter((v) => v !== value)
//   //   );
//   // };

//   return (
//     <CardContent>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//         <IconButton aria-label="edit" size="small" onClick={handleOpen}>
//           <EditOutlined />
//         </IconButton>
//       </Box>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="skills-modal-title"
//         aria-describedby="skills-modal-description"
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography id="skills-modal-title" variant="h6" component="h2" gutterBottom>
//             Edit Skills
//           </Typography>
//           <Divider />
//           <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <CodeOutlined />
//               </ListItemIcon>
//               <ListItemText primary="Programming Languages" />
//               <Box sx={{ ml: "auto" }}>
//                 <Checkbox />
//               </Box>
//             </ListItemButton>
//             <ListItem>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Checkbox sx={{ mr: 1 }} />
//                 <Typography variant="body2">CSS</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//                 <Typography variant="body2">JavaScript</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//               </Box>
//             </ListItem>
//           </List>
//           <Divider />
//           <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <CodeOutlined />
//               </ListItemIcon>
//               <ListItemText primary="Frameworks and Libraries" />
//               <Box sx={{ ml: "auto" }}>
//                 <Checkbox />
//               </Box>
//             </ListItemButton>
//             <ListItem>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Checkbox sx={{ mr: 1 }} />
//                 <Typography variant="body2">CSS</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//                 <Typography variant="body2">JavaScript</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//               </Box>
//             </ListItem>
//           </List>
//           <Divider />
//           <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <CodeOutlined />
//               </ListItemIcon>
//               <ListItemText primary="Databases" />
//               <Box sx={{ ml: "auto" }}>
//                 <Checkbox />
//               </Box>
//             </ListItemButton>
//             <ListItem>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Checkbox sx={{ mr: 1 }} />
//                 <Typography variant="body2">CSS</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//                 <Typography variant="body2">JavaScript</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//               </Box>
//             </ListItem>
//           </List>
//           <Divider />
//           <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <CodeOutlined />
//               </ListItemIcon>
//               <ListItemText primary="Tools" />
//               <Box sx={{ ml: "auto" }}>
//                 <Checkbox />
//               </Box>
//             </ListItemButton>
//             <ListItem>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Checkbox sx={{ mr: 1 }} />
//                 <Typography variant="body2">CSS</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//                 <Typography variant="body2">JavaScript</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//               </Box>
//             </ListItem>
//           </List>
//           <Divider />
//           <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <CodeOutlined />
//               </ListItemIcon>
//               <ListItemText primary="Specialization" />
//               <Box sx={{ ml: "auto" }}>
//                 <Checkbox />
//               </Box>
//             </ListItemButton>
//             <ListItem>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Checkbox sx={{ mr: 1 }} />
//                 <Typography variant="body2">CSS</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//                 <Typography variant="body2">JavaScript</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//               </Box>
//             </ListItem>
//           </List>
//           <Divider />
//           <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <CodeOutlined />
//               </ListItemIcon>
//               <ListItemText primary="Platforms and Services" />
//               <Box sx={{ ml: "auto" }}>
//                 <Checkbox />
//               </Box>
//             </ListItemButton>
//             <ListItem>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Checkbox sx={{ mr: 1 }} />
//                 <Typography variant="body2">CSS</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//                 <Typography variant="body2">JavaScript</Typography>
//                 <Checkbox sx={{ mr: 1, ml: 2 }} />
//               </Box>
//             </ListItem>
//           </List>
//         </Box>
//       </Modal>
//     </CardContent>
//   );
// }
export default SkillsCard;

                
                
                
                
                
                
                
      //           <Box sx={{ display: "flex", alignItems: "center" }}>
      //             <DevicesOutlined sx={{ mr: 2 }} />
      //             <Typography variant="h5">Platforms and Services</Typography>
      //             <IconButton onClick={handleOpen}>
      //               <EditOutlined />
      //             </IconButton>
      //           </Box>
      //           <List>
      //             {platformsAndServices.map((platform, index) => (
      //               <ListItem disablePadding key={index}>
      //                 <ListItemIcon>
      //                   <Checkbox
      //                     edge="start"
      //                     checked={platform.checked}
      //                     tabIndex={-1}
      //                     disableRipple
      //                   />
      //                 </ListItemIcon>
      //                 <ListItemText primary={platform.name} />
      //               </ListItem>
      //             ))}
      //           </List>
      //         </CardContent>
      //       </Modal>
      //   </Box>
      // </>
