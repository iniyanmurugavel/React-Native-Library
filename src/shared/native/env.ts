import { NativeModules } from 'react-native';

const rawEnvName = NativeModules.EnvModule?.ENV_NAME;
const normalized =
  typeof rawEnvName === 'string' && rawEnvName.length > 0
    ? rawEnvName.toUpperCase()
    : undefined;

export const environmentLabel =
  normalized === 'PRODUCTION'
    ? 'PRODUCTION'
    : normalized === 'STAGING'
      ? 'STAGING'
      : __DEV__
        ? 'STAGING'
        : 'PRODUCTION';

export const environmentVariant =
  environmentLabel === 'PRODUCTION' ? 'production' : 'staging';
