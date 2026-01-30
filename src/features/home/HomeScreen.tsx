import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/types';
import { Badge } from '../../shared/design-system/components/Badge';
import { Card } from '../../shared/design-system/components/Card';
import { Screen } from '../../shared/design-system/components/Screen';
import { palette, spacing } from '../../shared/design-system/tokens';
import { environmentLabel, environmentVariant } from '../../shared/native/env';
import { showToast } from '../../shared/utils/notifications';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ListItem = {
  id: string;
  title: string;
  subtitle: string;
  route?: keyof RootStackParamList;
  accent: string;
};

const listData: ListItem[] = [
  {
    id: 'screen-a',
    title: 'Feature A',
    subtitle: 'Opens Screen A in React Native',
    route: 'ScreenA',
    accent: palette.coral,
  },
  {
    id: 'screen-b',
    title: 'Feature B',
    subtitle: 'Opens Screen B in React Native',
    route: 'ScreenB',
    accent: palette.mint,
  },
  {
    id: 'toast',
    title: 'Just Toast',
    subtitle: 'Shows a toast without navigation',
    accent: palette.sky,
  },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>SG React Native Demo</Text>
          <Badge label={environmentLabel} variant={environmentVariant} />
        </View>
        <Text style={styles.subtitle}>
          Fancy list + toast + two-screen navigation
        </Text>
      </View>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subtitle={item.subtitle}
            accentColor={item.accent}
            onPress={() => {
              showToast(`${item.title} tapped`);
              if (item.route) {
                navigation.navigate(item.route);
              }
            }}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.ink,
  },
  subtitle: {
    marginTop: spacing.sm - 2,
    fontSize: 15,
    color: palette.fog,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
});
