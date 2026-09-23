import { createContext, useContext } from 'react';

export type ColorMode = 'light' | 'dark';

interface ColorModeContextValue {
  mode: ColorMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggleColorMode: () => undefined,
});

export function useColorMode() {
  return useContext(ColorModeContext);
}
