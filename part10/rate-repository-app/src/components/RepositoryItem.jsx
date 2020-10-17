import React from 'react'
import { View, Image, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import theme from '../theme'
import Text from './Text'
import { useHistory } from 'react-router-native'
import * as Linking from 'expo-linking'

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  columnContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  childContainer: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    margin: 5,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textTertiary,
    borderRadius: 3,
    padding: 3,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
})

const RepositoryItemChild = ({ number, label }) => {
  const count =
    number < 1000 ? number : `${Math.round((number * 10) / 100) / 10}k`

  return (
    <View style={styles.childContainer}>
      <Text fontWeight='bold'>{count}</Text>
      <Text>{label}</Text>
    </View>
  )
}

export const RepositoryItem = ({ item, ...props }) => {

  const history = useHistory()

  const onPress = () => {
    history.push(`/repositories/${item.id}`)
  }

  if (!item) {
    return (
      <Text>Loading RepositoryItem...</Text>
    )
  }
  
  return (

        <View style={styles.card}>

          <TouchableWithoutFeedback onPress={onPress}>

            <View style={styles.rowContainer}>
              <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
              <View style={styles.columnContainer}>
                <Text fontSize='subheading' fontWeight='bold' color='textPrimary'>
                  {item.fullName}
                </Text>
                <Text color='textSecondary'>{item.description}</Text>
                <Text style={styles.language}>{item.language}</Text>
              </View>
            </View>

          </TouchableWithoutFeedback>
          
          <View style={styles.bottomContainer}>
            <RepositoryItemChild number={item.stargazersCount} label='Stars' />
            <RepositoryItemChild number={item.forksCount} label='Forks' />
            <RepositoryItemChild number={item.reviewCount} label='Reviews' />
            <RepositoryItemChild number={item.ratingAverage} label='Rating' />
          </View>
          {props.gitHub && <GitHubButton url={item.url} />}
        </View>


  )
}

const GitHubButton = ({url}) => {
  const styles=StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      color: 'white',
      borderRadius: 4,
      height: 30,
      lineHeight: 30,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      overflow: 'hidden',
      textAlign: 'center',
      fontWeight: theme.fontWeights.bold,

    }
  })

  const onPress = () => {
    Linking.openURL(url)
  }

  return (
    <TouchableHighlight>
      <Text style={styles.button} onPress={onPress}>Open in GitHub</Text>
    </TouchableHighlight>
  )
}

export default RepositoryItem
