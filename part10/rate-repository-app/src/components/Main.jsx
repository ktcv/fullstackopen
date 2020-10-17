import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Route, Switch } from 'react-router-native'

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import SignUp from './SignUp'
import theme from '../theme'
import SignedOut from './SignedOut'
import RepositoryPage from './RepositoryPage'
import AddReviewPage from './AddReviewPage'
import UserReviewsPage from './UserReviewsPage'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: theme.fonts.main,
    backgroundColor: theme.colors.backgroundSecondary
  },
})

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path='/signedout' exact>
          <SignedOut />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/repositories/:id' exact>
          <RepositoryPage />
        </Route>
        <Route path='/newreview' exact>
          <AddReviewPage />
        </Route>
        <Route path='/userreviews' exact>
          <UserReviewsPage />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
      </Switch>
    </View>
  )
}

export default Main
