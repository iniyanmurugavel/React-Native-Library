import { DefaultTheme, Theme } from '@react-navigation/native';
import { palette } from '../../shared/design-system/tokens';

export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.ink,
    background: palette.cloud,
    card: palette.cloud,
    text: palette.ink,
    border: '#E5E1DC',
    notification: palette.coral,
  },
};
