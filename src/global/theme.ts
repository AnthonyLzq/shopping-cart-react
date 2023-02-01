import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      upColor: string
      middleColor: string
      bottomColor: string
      gradient: string
    }
    fab: {
      mainColor: string
      hoverColor: string
      activeColor: string
      fontColor: string
    }
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    customColors?: {
      upColor?: string
      middleColor?: string
      bottomColor?: string
      gradient?: string
    }
    fab?: {
      mainColor?: string
      hoverColor?: string
      activeColor?: string
      fontColor?: string
    }
  }

  interface BreakpointOverrides {
    xxs: true
    xs: true
    smd: true
    sm: true
    md: true
    lg: true
    xl: true
  }

  interface Palette {
    neutral: Palette['primary']
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary']
  }

  interface PaletteColor {
    darker?: string
  }

  interface SimplePaletteColorOptions {
    darker?: string
  }
}

const theme = createTheme({
  customColors: {
    upColor: 'rgb(0,21,41)',
    middleColor: 'rgba(17,93,99,1)',
    bottomColor: 'rgba(27,143,133,1)',
    gradient:
      'linear-gradient(180deg, rgba(0,21,41,1) 0%, rgba(17,93,99,1) 50%, rgba(27,143,133,1) 100%)'
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 464,
      sm: 600,
      smd: 756,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff'
    }
  }
})

export { theme }
