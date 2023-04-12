import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const StyledListItem = styled('li')(({ theme, self, sender }) => ({
  justifyContent: self !== sender ? 'flex-start' : 'flex-end',
  display: 'flex',
  flexDirection: 'column',
  alignItems: self !== sender ? 'flex-start' : 'flex-end',
  marginBottom: theme.spacing(2),
}));

const StyledMessageBox = styled(Box)(({ theme, self, sender }) => ({
  maxWidth: theme.breakpoints.values.xl,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows.md,
  color: self !== sender ? theme.palette.grey[700] : theme.palette.common.white,
  backgroundColor: self !== sender ? theme.palette.common.white : '#2196F3',
  border: self !== sender ? `1px solid ${theme.palette.grey[200]}` : 'none',
  borderColor: theme.palette.grey[200],
  '& span': {
    display: 'block',
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const StyledTimestamp = styled('span')(({ theme }) => ({
  display: 'block',
  fontSize: '0.75rem',
  color: theme.palette.grey[700],
}));

export default function Message({ message, self }) {
  return (
    <StyledListItem self={self} sender={message.sender}>
      <StyledMessageBox self={self} sender={message.sender}>
        <span>{message.message}</span>
      </StyledMessageBox>
      <StyledTimestamp>
        {timeAgo.format(new Date(message?.createdAt || ''))}
      </StyledTimestamp>
    </StyledListItem>
  );
}