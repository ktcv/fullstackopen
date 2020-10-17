import React from 'react'
import Text from './Text'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { Link } from 'react-router-native'
import theme from '../theme'

const AppBarTab = ({ title, to, ...props}) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.textTertiary,
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      padding: 4,
    },
  })

  return (
    <Link to={to} component={TouchableHighlight}>
      <Text style={styles.text} {...props}>{title}</Text>
    </Link>
  )
}

export default AppBarTab
