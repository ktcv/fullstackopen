import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import AppBarTab from './AppBarTab'
import Constants from 'expo-constants'
import theme from '../theme'
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  scrollview: {
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    padding: 5,
  },
})

const AppBar = () => {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(ME)

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollview}>
        <AppBarTab title='Repositories' to='/' />
        {!data?.authorizedUser && <AppBarTab title='Sign in' to='/signin' />}
        {data?.authorizedUser && <AppBarTab title='Add Review' to='/newreview' />}
        {data?.authorizedUser && <AppBarTab title='Sign out' to='/signedout' />}
        {!data?.authorizedUser && <AppBarTab title='Sign up' to='/signup' />}
        {data?.authorizedUser && <AppBarTab title={data.authorizedUser.username} user={data.authorizedUser} to='/userreviews' />}
      </ScrollView>
    </View>
  )
}

export default AppBar
