import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { palette } from '../../shared/design-system/tokens';
import { HomeScreen } from '../../features/home/HomeScreen';
import { ScreenA } from '../../features/feature/ScreenA';
import { ScreenB } from '../../features/feature/ScreenB';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  initialRoute?: keyof RootStackParamList;
};

const resolveInitialRoute = (
  initialRoute?: string,
): keyof RootStackParamList => {
  if (initialRoute === 'ScreenA' || initialRoute === 'ScreenB') {
    return initialRoute;
  }
  return 'Home';
};

export function RootNavigator({ initialRoute }: RootNavigatorProps) {
  const initialRouteName = resolveInitialRoute(initialRoute);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: { backgroundColor: palette.cloud },
        headerTintColor: palette.ink,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: palette.cloud },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'SG RN Demo' }}
      />
      <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} />
    </Stack.Navigator>
  );
}
