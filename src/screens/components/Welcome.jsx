import { WelcomeSVG } from "../../utils/WelcomeSVG";

import { Box, Typography } from "@mui/material";

export default function Welcome() {
  return (
    <Box
      sx={{
        gridColumn: { lg: "span 2" },
        display: { xs: "block" },
        backgroundColor: "white",
        color: { xs: "black", md: "gray.500" },
        py: 3,
        px: 5,
        textAlign: "center",
      }}
    >
      <WelcomeSVG style={{ width: '100%' }} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        Select a Chat to Start Messaging
      </Typography>
    </Box>
  );
}
