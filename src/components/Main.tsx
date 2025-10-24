import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Paper, { type PaperProps } from '@mui/material/Paper';
import type { StandardCSSProperties } from '@mui/system';
import type { FC } from 'react';

export type MainProps = PaperProps & {
  choke?: StandardCSSProperties['padding'];
};

const MainPaper = styled(Paper)<PaperProps>({
  flex: 1,
  minHeight: '100%',
  boxSizing: 'border-box',
  borderRadius: 8,
});

export const Main: FC<MainProps> = ({ choke = 1, ...props }) => (
  <>
    <Box
      sx={{
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 1,
        inset: 0,
        p: choke,
      }}
    >
      <Box
        sx={{
          height: '100%',
          borderRadius: 2,
          outlineStyle: 'solid',
          outlineWidth: '100vmax',
          outlineColor: (theme) => theme.palette.common.black,
        }}
      />
    </Box>

    <Box
      sx={{
        position: 'relative',
        p: choke,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <MainPaper {...props} />
    </Box>
  </>
);
