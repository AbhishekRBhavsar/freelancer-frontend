import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const OnlineIndicator = styled(Box)(({ theme }) => ({
  bottom: 0,
  left: 7,
  position: "absolute",
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "50%",
  border: `2px solid ${theme.palette.common.white}`,
}));

export default function UserLayout({ user, onlineUsersId }) {
  return (
    <Box sx={{ position: "relative", display: "flex", alignItems: "center", color: 'black' }}>
      {/* <Avatar sx={{   }} src={user?.picture} alt="" /> */}
      <Typography variant="body1" component="span" sx={{ ml: 2 }}>
        {`${user?.firstName} ${user?.lastName}`}
      </Typography>
      {onlineUsersId?.includes(user?._id) ? (
        <OnlineIndicator sx={{ bgcolor: "green.500", dark: { bgcolor: "green.400" } }} />
      ) : (
        <OnlineIndicator sx={{ bgcolor: "gray.400" }} />
      )}
    </Box>
  );
}
