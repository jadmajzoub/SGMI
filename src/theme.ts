import { createTheme } from '@mui/material/styles'
import { THEME_COLORS, DIMENSIONS, SPACING } from './constants/theme'

export const theme = createTheme({
  palette: {
    background: { default: THEME_COLORS.BACKGROUND_LIGHT, paper: THEME_COLORS.BACKGROUND_PAPER },
    primary: { main: THEME_COLORS.PRIMARY_BLUE, contrastText: '#ffffff' },
    text: { primary: THEME_COLORS.TEXT_PRIMARY, secondary: THEME_COLORS.TEXT_SECONDARY },
    grey: { 300: '#d1d5db', 800: THEME_COLORS.SIDEBAR_DARK }
  },
  shape: { borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM },
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE, boxShadow: '0 0 20px rgba(0,0,0,0.3)' } } },
    MuiButton: { styleOverrides: { root: { padding: SPACING.BUTTON_PADDING } } }
  }
})
