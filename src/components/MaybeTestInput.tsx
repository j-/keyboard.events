import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { alpha } from '@mui/material/styles';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { type FC } from 'react';
import { DRAWER_WIDTH } from '../constants';
import { useInputRef, useTextareaRef } from '../context/InputRefContext';
import { useAppContext } from '../hooks/use-app-context';
import { InputType } from '../types';

export type MaybeTestInputProps = {
  drawerOpen?: boolean;
  drawerWidth?: number;
};

export const MaybeTestInput: FC<MaybeTestInputProps> = ({
  drawerOpen,
  drawerWidth = DRAWER_WIDTH,
}) => {
  const inputRef = useInputRef();
  const textarearaRef = useTextareaRef();
  const { inputType } = useAppContext();

  const isInput = inputType === InputType.INPUT;
  const isTextarea = inputType === InputType.TEXTAREA;

  const commonProps: Partial<TextFieldProps> = {
    autoComplete: 'off',
    fullWidth: true,
    slotProps: {
      input: {
        sx: (theme) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.75),
          boxShadow: theme.shadows[4],
          backdropFilter: 'blur(4px)',
          '&:hover, &:focus, &:focus-within, &:focus-visible': {
            backgroundColor: theme.palette.background.paper,
          },
        }),
      },
    },
    sx: {
      position: 'absolute',
      transform: 'translateX(-50%)',
      left: '50%',
      width: 'min-max(25%, 80%)',
      maxWidth: '50ch',
      '& input, & textarea': {
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        resize: 'none',
        height: 'auto',
      },
    },
    onBlur: (e) => {
      e.target.value = '';
    },
  };

  return (
    <Box
      sx={[
        (theme) => ({
          position: 'fixed',
          bottom: theme.spacing(10),
          left: 0,
          right: 0,
          zIndex: theme.zIndex.drawer - 1,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }),

        drawerOpen ? (theme) => ({
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: `${drawerWidth}px`,
        }) : null,
      ]}
    >
      <Fade in={isInput}>
        <TextField
          {...commonProps}
          placeholder="Test input, type here to fire keyboard events"
          slotProps={{
            ...commonProps.slotProps,
            htmlInput: {
              ref: inputRef,
            },
          }}
        />
      </Fade>

      <Fade in={isTextarea}>
        <TextField
          {...commonProps}
          multiline
          rows={1}
          placeholder="Test textarea, type here to fire keyboard events"
          slotProps={{
            ...commonProps.slotProps,
            htmlInput: {
              ref: textarearaRef,
            },
          }}
        />
      </Fade>
    </Box>
  );
};
