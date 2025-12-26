import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { useId, type FC } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { EventTargetOption, InputType, OptionsLevel } from '../types';

export const AppSidebarContent: FC = () => {
  const id = useId();

  const {
    capture,
    setCapture,
    stopPropagation,
    setStopPropagation,
    preventDefault,
    setPreventDefault,
    handleKeydown,
    setHandleKeydown,
    handleKeyup,
    setHandleKeyup,
    handleKeypress,
    setHandleKeypress,
    optionsLevel,
    setOptionsLevel,
    eventTarget,
    setEventTarget,
    persistSidebar,
    setPersistSidebar,
    inputType,
    setInputType,
  } = useAppContext();

  return (
    <Stack gap={2} m={4} height="100%">
      <FormControl>
        <FormLabel id={`${id}-show`}>Mode</FormLabel>

        <RadioGroup
          aria-labelledby={`${id}-show`}
          onChange={(_, value) => {
            setOptionsLevel(
              Number(value) as OptionsLevel,
            );
          }}
          row
        >
          <FormControlLabel
            name="options"
            value={OptionsLevel.BASIC}
            label="Basic"
            control={<Radio size="small" />}
            checked={optionsLevel === OptionsLevel.BASIC}
          />

          <FormControlLabel
            name="options"
            value={OptionsLevel.ADVANCED}
            label="Advanced"
            control={<Radio size="small" />}
            checked={optionsLevel === OptionsLevel.ADVANCED}
          />
        </RadioGroup>
      </FormControl>

      {optionsLevel > OptionsLevel.HIDE && (
        <>
          <FormControl>
            <FormLabel id={`${id}-input-type`}>Test input</FormLabel>

            <RadioGroup
              aria-labelledby={`${id}-input-type`}
              onChange={(_, value) => {
                setInputType(
                  Number(value) as InputType,
                );
              }}
              row
            >
              <FormControlLabel
                name="options"
                value={InputType.HIDE}
                label="Hide"
                control={<Radio size="small" />}
                checked={inputType === InputType.HIDE}
              />

              <FormControlLabel
                name="options"
                value={InputType.INPUT}
                label="Input"
                control={<Radio size="small" />}
                checked={inputType === InputType.INPUT}
              />

              <FormControlLabel
                name="options"
                value={InputType.TEXTAREA}
                label="Textarea"
                control={<Radio size="small" />}
                checked={inputType === InputType.TEXTAREA}
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id={`${id}-listen-to`}>Listen to</FormLabel>

            <FormGroup
              aria-labelledby={`${id}-listen-to`}
              row
            >
              <FormControlLabel
                name="handle"
                value="keydown"
                label="keydown"
                control={<Checkbox size="small" />}
                checked={handleKeydown}
                onChange={(_, checked) => setHandleKeydown(checked)}
              />

              <FormControlLabel
                name="handle"
                value="keyup"
                label="keyup"
                control={<Checkbox size="small" />}
                checked={handleKeyup}
                onChange={(_, checked) => setHandleKeyup(checked)}
              />

              <FormControlLabel
                name="handle"
                value="keypress"
                label="keypress"
                control={<Checkbox size="small" />}
                checked={handleKeypress}
                onChange={(_, checked) => setHandleKeypress(checked)}
              />
            </FormGroup>
          </FormControl>

          <FormControl>
            <FormLabel id={`${id}-modifiers`}>Modifiers</FormLabel>

            <FormGroup
              aria-labelledby={`${id}-modifiers`}
              row
            >
              <FormControlLabel
                name="prepare"
                value="stopPropagation"
                label="stopPropagation"
                control={<Checkbox size="small" />}
                checked={stopPropagation}
                onChange={(_, checked) => setStopPropagation(checked)}
              />

              <FormControlLabel
                name="prepare"
                value="preventDefault"
                label="preventDefault"
                control={<Checkbox size="small" />}
                checked={preventDefault}
                onChange={(_, checked) => setPreventDefault(checked)}
              />
            </FormGroup>
          </FormControl>

          {optionsLevel > OptionsLevel.BASIC && (
            <>
              <FormControl>
                <FormLabel id={`${id}-event-phase`}>Event phase</FormLabel>

                <RadioGroup
                  aria-labelledby={`${id}-event-phase`}
                  onChange={(_, value) => {
                    setCapture(value === 'capture');
                  }}
                  row
                >
                  <FormControlLabel
                    name="phase"
                    value="bubble"
                    label="Bubble"
                    control={<Radio size="small" />}
                    checked={!capture}
                  />

                  <FormControlLabel
                    name="phase"
                    value="capture"
                    label="Capture"
                    control={<Radio size="small" />}
                    checked={capture}
                  />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel id={`${id}-event-target`}>Event target</FormLabel>

                <RadioGroup
                  aria-labelledby={`${id}-event-target`}
                  onChange={(_, value) => {
                    setEventTarget(
                      Number(value) as EventTargetOption,
                    );
                  }}
                >
                  <FormControlLabel
                    name="event-target"
                    value={EventTargetOption.WINDOW}
                    label="Window"
                    control={<Radio size="small" sx={{ ml: 0 }} />}
                    checked={eventTarget === EventTargetOption.WINDOW}
                    sx={{ width: 'fit-content' }}
                  />

                  <FormControlLabel
                    name="event-target"
                    value={EventTargetOption.DOCUMENT}
                    label="Document"
                    control={<Radio size="small" sx={{ ml: 1 }} />}
                    checked={eventTarget === EventTargetOption.DOCUMENT}
                    sx={{ width: 'fit-content' }}
                  />

                  <FormControlLabel
                    name="event-target"
                    value={EventTargetOption.HTML}
                    label="HTML"
                    control={<Radio size="small" sx={{ ml: 2 }} />}
                    checked={eventTarget === EventTargetOption.HTML}
                    sx={{ width: 'fit-content' }}
                  />

                  <FormControlLabel
                    name="event-target"
                    value={EventTargetOption.BODY}
                    label="Body"
                    control={<Radio size="small" sx={{ ml: 3 }} />}
                    checked={eventTarget === EventTargetOption.BODY}
                    sx={{ width: 'fit-content' }}
                  />

                  <FormControlLabel
                    name="event-target"
                    value={EventTargetOption.INPUT}
                    label="Input"
                    control={<Radio size="small" sx={{ ml: 4 }} />}
                    checked={eventTarget === EventTargetOption.INPUT}
                    sx={{ width: 'fit-content' }}
                  />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel id={`${id}-app`}>App controls</FormLabel>

                <FormGroup
                  aria-labelledby={`${id}-app`}
                  row
                >
                  <FormControlLabel
                    name="sidebar"
                    value="persist"
                    label="Persist sidebar"
                    control={<Checkbox size="small" />}
                    checked={persistSidebar}
                    onChange={(_, checked) => setPersistSidebar(checked)}
                  />
                </FormGroup>
              </FormControl>
            </>
          )}
        </>
      )}

      <Box mt="auto" py={2}>
        <Link href="https://skeoh.com/?utm_source=keyboard.events" target="_blank" rel="noopener">
          skeoh.com
        </Link>
      </Box>
    </Stack>
  );
};
