import { Stack } from '@mui/material';
import type { FC } from 'react';

export const AppContent: FC = () => {
  return (
    <details>
      <summary>Expand content</summary>
      <Stack>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>Line {i + 1}</div>
        ))}
      </Stack>
    </details>
  );
};
