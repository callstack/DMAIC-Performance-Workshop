import {DefaultTheme} from '@react-navigation/native';

const GAP = 8;
const getGap = (gap: number) => GAP * gap;
export const theme = {
  colors: {
    primary: '#68548E',
    primaryContainer: '#f4eeff',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#230F46',
    text: '#333',
    surfaceStrong: '#9e6bf4',
    surface: '#D3BCFD',
    disabled: '#e0e0e0',
  },
  fontSize: {
    smaller: 12,
    regular: 14,
    medium: 16,
    large: 18,
  },
  gap: GAP,
  getGap,
};

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    card: theme.colors.primary,
    text: theme.colors.onPrimary,
    background: theme.colors.primaryContainer,
  },
};
