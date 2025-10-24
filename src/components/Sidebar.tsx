import { ThemeProvider } from '@mui/material';
import Drawer, { drawerClasses, DrawerProps } from '@mui/material/Drawer';
import { FC } from 'react';
import { shadTheme } from '../theme';

export type SidebarProps = DrawerProps & {
  width?: number;
};

export const Sidebar: FC<SidebarProps> = ({
  width = 240,
  ...props
}) => (
  <ThemeProvider theme={shadTheme('dark')}>
    <Drawer
      variant="persistent"
      anchor="left"
      sx={{
        width: width,
        flexShrink: 0,
        [`& .${drawerClasses.paper}`]: {
          width: width,
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
      slotProps={{
        paper: {
          elevation: 0,
        },
      }}
      {...props}
    />
  </ThemeProvider>
);
