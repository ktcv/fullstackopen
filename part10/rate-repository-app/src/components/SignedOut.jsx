import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import Text from './Text'
import { useApolloClient } from '@apollo/client'
import AuthStorageContent from '../contexts/AuthStorageContext'

const SignedOut = () => {
  const styles = StyleSheet.create({
    text: {
      textAlign: "center",
      paddingTop: 20,
    }
  })
  
  const authStorage = useContext(AuthStorageContent)
  const apolloClient = useApolloClient()

  authStorage.removeAccessToken()
  apolloClient.resetStore()

  return (
    <View >
      <Text style={styles.text}>You have successfully signed out.</Text>
    </View>
  )
}

export default SignedOut
