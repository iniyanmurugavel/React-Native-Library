import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/types';
import { FeatureScreen } from './FeatureScreen';

type ScreenBProps = NativeStackScreenProps<RootStackParamList, 'ScreenB'>;

export function ScreenB({ navigation }: ScreenBProps) {
  return (
    <FeatureScreen
      title="Screen B"
      description="This is the second screen. Use back or jump to Screen A."
      onPrimary={() => navigation.goBack()}
      onSecondary={() => navigation.navigate('ScreenA')}
      secondaryLabel="Go to Screen A"
    />
  );
}
