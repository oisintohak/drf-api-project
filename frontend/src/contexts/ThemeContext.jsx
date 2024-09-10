// adapted from https://github.com/mui/material-ui/blob/v5.16.7/docs/data/material/customization/dark-mode/ToggleColorMode.js
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorage } from "@uidotdev/usehooks";


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export const useColorModeContext = () => React.useContext(ColorModeContext)

export function ThemeToggleProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorage('colorMode', '');
  const colorMode = {
    toggleColorMode: () => {
      console.log('toggle')
      setMode((prevMode) => {
        console.log(`prevMode: ${prevMode}`)
        return prevMode === 'light' ? 'dark' : 'light'
      });
    }
  };

  React.useEffect(() => {
    console.log(`prefersDarkMode: ${prefersDarkMode}`)
    if (prefersDarkMode && mode === '') setMode('dark')
    else if (mode === '') setMode('light')
  }, [prefersDarkMode])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: mode ? {
          mode
        } : {},
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

