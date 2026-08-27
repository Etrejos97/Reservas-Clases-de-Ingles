import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default function LabelLevel({ level }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'auto',
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});