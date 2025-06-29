import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '@/constants/theme';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'full';
}

export function QuickActionCard({ title, subtitle, icon, onPress, variant = 'default' }: QuickActionCardProps) {
  const isFullWidth = variant === 'full';

  return (
    <TouchableOpacity 
      style={[styles.card, isFullWidth && styles.fullWidthCard]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isFullWidth && styles.fullWidthIconContainer]}>
        {icon}
      </View>
      <View style={[styles.content, isFullWidth && styles.fullWidthContent]}>
        <Text style={[styles.title, isFullWidth && styles.fullWidthTitle]}>{title}</Text>
        <Text style={[styles.subtitle, isFullWidth && styles.fullWidthSubtitle]}>{subtitle}</Text>
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
  fullWidthCard: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
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
  fullWidthIconContainer: {
    width: 64,
    height: 64,
    marginBottom: 0,
    marginRight: Spacing.xl,
  },
  content: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  fullWidthContent: {
    flex: 1,
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  fullWidthTitle: {
    fontSize: FontSizes.lg,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  fullWidthSubtitle: {
    fontSize: FontSizes.md,
    textAlign: 'left',
  },
});