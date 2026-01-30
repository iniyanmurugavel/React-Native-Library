import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { palette, radii, spacing } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button">
      <Text
        style={
          variant === 'primary'
            ? styles.primaryText
            : styles.secondaryText
        }>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.lg - 2,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  primary: {
    backgroundColor: palette.ink,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E0DA',
  },
  secondaryText: {
    color: palette.ink,
    fontWeight: '700',
    fontSize: 15,
  },
});
