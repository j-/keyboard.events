import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

export const ToggleSidebarButton = styled(IconButton)(({ theme }) => ({
  backdropFilter: 'blur(4px)',
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
}));
