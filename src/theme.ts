import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    background: { default: '#f8fafc', paper: '#ffffff' },
    primary: { main: '#2563eb', contrastText: '#ffffff' },
    text: { primary: '#111827', secondary: '#6b7280' },
    grey: { 300: '#d1d5db', 800: '#1f2937' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 15, boxShadow: '0 0 20px rgba(0,0,0,0.3)' } } },
    MuiButton: { styleOverrides: { root: { padding: '12px 20px' } } }
  }
})
