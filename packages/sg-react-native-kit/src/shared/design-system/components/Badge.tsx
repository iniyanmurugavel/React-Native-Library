import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radii, spacing } from '../tokens';

export type BadgeVariant = 'staging' | 'production';

type BadgeProps = {
  label: string;
  variant: BadgeVariant;
};

const variantStyles = {
  staging: {
    backgroundColor: '#E7F3FF',
    borderColor: '#9BC6FF',
  },
  production: {
    backgroundColor: '#FFE8E4',
    borderColor: '#FFB2A7',
  },
} as const;

export function Badge({ label, variant }: BadgeProps) {
  return (
    <View style={[styles.badge, variantStyles[variant]]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  text: {
    fontSize: 11,
    fontWeight: '800',
    color: palette.ink,
    letterSpacing: 0.6,
  },
});
