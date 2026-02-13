/**
 * Nura Stays MUI Theme Configuration
 */
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C6A75E',
      light: '#D4BC7E',
      dark: '#A98A43',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1F1F1F',
      light: '#2A2A2A',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FEFCF9',
      beige: '#F5E6D3',
      warmGray: '#FAF8F5',
    },
    text: {
      primary: '#1F1F1F',
      secondary: '#777777',
      light: '#999999',
            disabled: '#AAAAAA',

    },
    common: {
      white: '#FFFFFF',
      black: '#333333',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:900px)': {
        fontSize: '2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#666666',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#666666',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          backgroundColor: '#C6A75E',
          color: '#fff',
          '&:hover': { backgroundColor: '#A98A43', boxShadow: 'none' },
          boxShadow: 'none',
        },
        outlinedPrimary: {
          borderColor: '#C6A75E',
          color: '#C6A75E',
          '&:hover': { backgroundColor: 'rgba(198,167,94,0.06)', borderColor: '#A98A43' },
        },
        outlinedSecondary: {
          borderColor: '#1F1F1F',
          color: '#1F1F1F',
          '&:hover': { backgroundColor: '#1F1F1F', color: '#fff' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid #EAEAEA',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#333333',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '& fieldset': { borderColor: '#E5E5E5' },
            '&:hover fieldset': { borderColor: '#C6A75E' },
            '&.Mui-focused fieldset': {
              borderColor: '#C6A75E',
              boxShadow: '0 0 0 2px rgba(198,167,94,0.15)',
            },
          },
        },
      },
    },MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '10px !important',
          border: '1px solid #E5E5E5',
          '&::before': { display: 'none' },
          '&.Mui-expanded': {
            backgroundColor: 'rgba(198,167,94,0.03)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#C6A75E',
          color: '#fff',
        },
        outlinedPrimary: {
          borderColor: '#C6A75E',
          color: '#C6A75E',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 8,
            '&.Mui-selected': {
              backgroundColor: '#C6A75E',
              color: '#fff',
              '&:hover': { backgroundColor: '#A98A43' },
            },
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: { color: '#C6A75E' },
        iconEmpty: { color: '#E5E5E5' },
      },
    },
  },
});

export default theme;
