import Drawer, { drawerClasses, type DrawerProps } from '@mui/material/Drawer';
import { ThemeProvider } from '@mui/material/styles';
import { type FC } from 'react';
import { shadTheme } from '../theme';

export type SidebarProps = DrawerProps & {
  width?: number;
};

export const Sidebar: FC<SidebarProps> = ({
  variant = 'persistent',
  width = 240,
  ...props
}) => (
  <ThemeProvider theme={shadTheme('dark')}>
    <Drawer
      variant={variant}
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
