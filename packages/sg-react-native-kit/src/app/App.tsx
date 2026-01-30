import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { navTheme } from './navigation/navTheme';
import { RootStackParamList } from './navigation/types';

type AppProps = {
  initialRoute?: keyof RootStackParamList;
};

export function App({ initialRoute }: AppProps) {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer theme={navTheme}>
          <RootNavigator initialRoute={initialRoute} />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
