import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, coloresPorNivel } from '../theme';

export default function LabelLevel({ level }) {
  const color = coloresPorNivel[level] ?? colors.textoSuave;
  return (
    <View style={[styles.container, { borderColor: color, backgroundColor: color + '1A' }]}>
      <Text style={[styles.text, { color }]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radius.full,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
