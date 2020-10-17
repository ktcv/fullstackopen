import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_REVIEW } from '../graphql/mutations'
import styled from 'styled-components/native'
import { css } from 'styled-components' 

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
    padding: 10
  },
  rowContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  columnContainer: {
    flexDirection: 'column',
    flexShrink: 1
  },
  rating: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    lineHeight: 33,
    marginRight: 10
  },
  repoName: {
    fontWeight: theme.fontWeights.bold
  },
  username: {
    fontWeight: theme.fontWeights.normal
  },
  date: {
    color: theme.colors.textSecondary,
    paddingBottom: 5
  },
  button: {
    width: 150,
    margin: 5,
    marginBottom: 0,
    height: 30,
    borderStyle: 'solid',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingTop: 6,
  },
})

const ButtonText = styled.Text`
  width: 150px;
  margin: 5px;
  margin-bottom: 0px;
  height: 30px;
  border-style: solid;
  border-radius: 3px;
  overflow: hidden;
  font-weight: bold;
  color: white;
  text-align: center;
  padding-top: 6px;
  background-color: ${theme.colors.primary};
  ${({isRed})=>isRed && css`background-color: ${theme.colors.error}`}
`

const Review = ({item, refetch, user}) => {
  const formattedDate = format(new Date(item.createdAt), 'd MMMM yyyy')

  const [mutate] = useMutation(DELETE_REVIEW)

  const onPress = () => {
    Alert.alert(
      'Delete review',
      `Are you sure you want to delete the review on ${item.repository.name}?`,
      [
        {
          text: 'CANCEL',
          style: 'cancel'
        },
        {
          text: 'DELETE',
          onPress: async () => {
            await mutate({variables: {id: item.id}})
            refetch()
          }
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}> 
        <Text style={styles.rating}>{item.rating}</Text>
        <View style={styles.columnContainer}>
          <Text style={styles.repoName}>{item.repository.name}</Text>
          <Text style={styles.username}>{item.user.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text>{item.text}</Text>
        </View>
      </View>
      {user && 
        <View style={styles.buttonContainer}>
          <Link component={TouchableWithoutFeedback} to={`/repositories/${item.repositoryId}`}>
            <ButtonText>View repository</ButtonText>
          </Link>
          <TouchableWithoutFeedback>
            <ButtonText onPress={onPress} isRed>Delete review</ButtonText>
          </TouchableWithoutFeedback>
        </View>
      }
    </View>
  )
}

export default Review
