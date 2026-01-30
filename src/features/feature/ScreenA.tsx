import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/types';
import { FeatureScreen } from './FeatureScreen';

type ScreenAProps = NativeStackScreenProps<RootStackParamList, 'ScreenA'>;

export function ScreenA({ navigation }: ScreenAProps) {
  return (
    <FeatureScreen
      title="Screen A"
      description="Native can open this screen directly, or you can navigate here from the list."
      onPrimary={() => navigation.goBack()}
      onSecondary={() => navigation.navigate('ScreenB')}
      secondaryLabel="Go to Screen B"
    />
  );
}
