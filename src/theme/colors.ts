export const NUSColors = {
  orange: '#FF8200', // Pantone PMS 152
  blue: '#003D7C',   // Pantone PMS 294
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
} as const;

export const theme = {
  light: {
    primary: NUSColors.blue,
    secondary: NUSColors.orange,
    background: NUSColors.white,
    surface: NUSColors.gray[100],
    text: NUSColors.black,
    textSecondary: NUSColors.gray[600],
    border: NUSColors.gray[300],
  },
  dark: {
    primary: NUSColors.orange,
    secondary: NUSColors.blue,
    background: NUSColors.black,
    surface: NUSColors.gray[900],
    text: NUSColors.white,
    textSecondary: NUSColors.gray[400],
    border: NUSColors.gray[700],
  },
} as const;

export type Theme = typeof theme.light;
