import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LabelLevel({ level }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: full,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});