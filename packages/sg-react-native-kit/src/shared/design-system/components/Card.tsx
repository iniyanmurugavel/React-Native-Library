import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette, radii, spacing, shadows } from '../tokens';

type CardProps = {
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
};

export function Card({ title, subtitle, accentColor, onPress }: CardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>
      <View style={[styles.accent, { backgroundColor: accentColor }]} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.chevron}>{'>'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.bone,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    ...shadows.card,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  accent: {
    width: 6,
    height: 52,
    borderRadius: radii.sm,
    marginRight: spacing.lg - 2,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.ink,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: palette.graphite,
  },
  chevron: {
    fontSize: 22,
    color: palette.fog,
  },
});
