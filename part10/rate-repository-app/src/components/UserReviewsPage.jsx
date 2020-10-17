import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { ME } from '../graphql/queries'
import Text from './Text'
import Review from './Review'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
  container: {
    flex: 1
  },
  title: {
    padding: 10,
    paddingBottom: 0
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const UserReviewsPage = () => {
  const { data, error, loading, refetch, fetchMore } = useQuery(ME, {variables: {includeReviews: true, first: 5}, fetchPolicy: 'cache-and-network'})

  if (loading && !data) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error...{error.message}</Text>
  }

  const reviewNodes = data?.authorizedUser.reviews.edges.map(edge=>edge.node)

  const formattedDate = format(new Date(data.authorizedUser.createdAt), 'd MMM yyyy')

  const handleEndReached = () => {
    const canFetchMore = !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      query: ME,
      variables: {
        includeReviews: true,
        first: 5,
        after: data.authorizedUser.reviews.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const updatedResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
            ...fetchMoreResult.authorizedUser.reviews,
            edges: [
              ...previousResult.authorizedUser.reviews.edges,
              ...fetchMoreResult.authorizedUser.reviews.edges
            ]
          }}
        }
        return updatedResult
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text fontWeight='bold' style={styles.title}>{data.authorizedUser.username} Reviews</Text>
      <Text style={styles.title}>Member since {formattedDate}</Text>
      <Text style={styles.title}>{data.authorizedUser.reviewCount} Reviews</Text>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item=>item.id}
        renderItem={({item})=>{
          return <Review item={item} refetch={refetch} user />
        }}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
      />
    </View>
  )
}

export default UserReviewsPage