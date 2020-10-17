import React, {useState} from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import SortBar from './SortBar'
import { useDebounce } from 'use-debounce'

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryListContainer = ({repositories, onEndReached}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.fullName}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => {
        return <RepositoryItem item={item} />
      }}
    />
  )
}

const RepositoryList = () => {
  const [order, setOrder] = useState('RATING_AVERAGE')
  const [direction, setDirection] = useState('ASC')
  const [sort, setSort] = useState('highestRated')
  const [filter, setFilter] = useState('')

  const [debouncedFilter] = useDebounce(filter, 500)

  const { repositories, fetchMore } = useRepositories({first: 5, orderBy: order, orderDirection: direction, searchKeyword: debouncedFilter})

  const onEndReached = () => {
    fetchMore()
  }

  return (
  <View style={styles.container}>
    <SortBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} order={order} setOrder={setOrder} direction={direction} setDirection={setDirection} />
    <RepositoryListContainer repositories={repositories} filter={filter} setFilter={setFilter} onEndReached={onEndReached} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
  }
})

export default RepositoryList
