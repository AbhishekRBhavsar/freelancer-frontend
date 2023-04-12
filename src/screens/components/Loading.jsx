import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loading = ({value}) => {
  const [open, setOpen] = React.useState(value);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
};

export default Loading;