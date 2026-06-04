import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export function AppText({ style, children, ...props }: TextProps) {
  return (
    // This merges our default white color with any custom style you pass in later!
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    color: '#ffffff', // <-- Your universal default text color!
  },
});