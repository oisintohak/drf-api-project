// adapted from https://github.com/mui/material-ui/blob/v5.16.7/docs/data/material/customization/dark-mode/ToggleColorMode.js
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocalStorage } from "@uidotdev/usehooks";

import { yellow, teal, grey, blueGrey } from '@mui/material/colors';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
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
        components:{
          MuiAppBar: {
            defaultProps: {
              color: "alt"
            }
          },
          MuiInputBase: {
            styleOverrides: {
                root: {
                    width: '25ch',
                }
            }
        }
        },
        palette: mode == 'dark' ? {
          mode: 'dark',
          primary: {
            main: teal[400],
            light: teal[200],
            dark: teal[800]
          },
          secondary: {
            main: yellow[400],
            light: yellow[200],
            dark: yellow[800]
          },
          alt: {
            main: teal[100],
            contrastText: teal[100]
          },
          // background: {
          //   paper: blueGrey["50"],
          //   alt: teal[50],
          //   default: grey["50"]
          // }
          
        } : {
          mode: 'light',
          primary: {
            main: teal[600],
            light: teal[400],
            dark: teal[900]
          },
          secondary: {
            main: yellow[600],
            light: yellow[400],
            dark: yellow[900]
          },
          alt: {
            main: teal[100],
            contrastText: teal[100]
          },
          background: {
            paper: blueGrey["50"],
            alt: teal[50],
            default: grey["50"]
          }
        }
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

