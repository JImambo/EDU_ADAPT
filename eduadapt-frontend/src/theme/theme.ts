import { createTheme } from '@mui/material/styles';

// Palette de couleurs professionnelle et moderne
// Bleu profond pour la fiabilité, Teal pour l'innovation, et des gris neutres.
const palette = {
  primary: {
    main: '#1a237e', // Bleu nuit profond
    light: '#534bae',
    dark: '#000051',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#00897b', // Teal sophistiqué
    light: '#4db6ac',
    dark: '#005b54',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#f4f6f8', // Un gris très clair pour le fond, moins agressif que le blanc pur
    paper: '#ffffff',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
  },
};

// Typographie moderne et lisible
const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h4: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: palette.primary.main,
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: palette.text.primary,
  },
  h6: {
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
};

// Personnalisation des composants pour un look unique
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none', // Pas de majuscules automatiques, plus moderne
        borderRadius: 8,
        fontWeight: 500,
        padding: '10px 24px',
      },
      contained: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none', // Évite les problèmes de fond blanc sur les cartes
      },
    },
  },
};

export const theme = createTheme({
  palette,
  typography,
  components,
});