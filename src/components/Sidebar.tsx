import Drawer, { drawerClasses, type DrawerProps } from '@mui/material/Drawer';
import { ThemeProvider } from '@mui/material/styles';
import { type FC } from 'react';
import { DRAWER_WIDTH } from '../constants';
import { shadTheme } from '../theme';

export type SidebarProps = DrawerProps & {
  width?: number;
};

export const Sidebar: FC<SidebarProps> = ({
  variant = 'persistent',
  width = DRAWER_WIDTH,
  ...props
}) => (
  <ThemeProvider theme={shadTheme('dark')}>
    <Drawer
      variant={variant}
      anchor="left"
      sx={{
        width,
        flexShrink: 0,
        [`& .${drawerClasses.paper}`]: {
          width,
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            // Make room for snack bar if shown.
            pb: 6,
          },
        },
      }}
      {...props}
    />
  </ThemeProvider>
);
