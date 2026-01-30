import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../shared/design-system/components/Button';
import { Screen } from '../../shared/design-system/components/Screen';
import { palette, spacing, radii, shadows } from '../../shared/design-system/tokens';

type FeatureScreenProps = {
  title: string;
  description: string;
  onPrimary: () => void;
  onSecondary: () => void;
  secondaryLabel: string;
};

export function FeatureScreen({
  title,
  description,
  onPrimary,
  onSecondary,
  secondaryLabel,
}: FeatureScreenProps) {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>React Native</Text>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroBody}>{description}</Text>
      </View>
      <View style={styles.actions}>
        <Button label="Go Back" onPress={onPrimary} />
        <Button
          label={secondaryLabel}
          variant="secondary"
          onPress={onSecondary}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xxxl,
    padding: spacing.xxl,
    borderRadius: radii.xl,
    backgroundColor: '#FFFFFF',
    ...shadows.hero,
  },
  heroEyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: palette.fog,
    fontWeight: '700',
  },
  heroTitle: {
    marginTop: spacing.sm - 2,
    fontSize: 26,
    fontWeight: '800',
    color: palette.ink,
  },
  heroBody: {
    marginTop: spacing.md - 2,
    fontSize: 15,
    color: palette.graphite,
    lineHeight: 22,
  },
  actions: {
    marginTop: spacing.xxxl - 4,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
});
