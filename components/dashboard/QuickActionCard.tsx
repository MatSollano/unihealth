import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '@/constants/theme';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export function QuickActionCard({ title, subtitle, icon, onPress }: QuickActionCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    backgroundColor: Colors.surface,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    ...Shadows.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  content: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});