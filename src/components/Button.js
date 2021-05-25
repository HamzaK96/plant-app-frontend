import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined', //&& { backgroundColor: theme.colors.bgscreen },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />

  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 45,
    backgroundColor: '#2FF712',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
