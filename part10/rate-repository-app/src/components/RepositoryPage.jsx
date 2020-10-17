import { useQuery } from '@apollo/react-hooks'
import { Text, View, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY_BY_ID } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'
import Review from './Review'

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
  container: {
    flex: 1
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryPage = () => {
  const { id } = useParams()
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY_BY_ID, { variables: { id: id, first: 5 }, fetchPolicy: 'cache-and-network'})


  const reviewNodes = data ? data.repository.reviews.edges.map((edge) => edge.node) : []

  if (loading && !data) {
    return <Text>Loading RepositoryPage...</Text>
  }
    if (error) {
    return <Text>Error...{error.message}</Text>
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    } else {
      fetchMore({
        query: GET_REPOSITORY_BY_ID,
        variables: {
          first: 5,
          after: data.repository.reviews.pageInfo.endCursor,
          id: id,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          
          const nextResult = {
            repository: {
              ...fetchMoreResult.repository,
              reviews: {
                ...fetchMoreResult.repository.reviews,
                edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ]}
            },
          }

          return nextResult
        },
      })
    }
  }

  return (
    <View>
      <FlatList 
      data={reviewNodes}
      renderItem={({item})=><Review item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} gitHub />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      />
    </View>
  )
}

export default RepositoryPage