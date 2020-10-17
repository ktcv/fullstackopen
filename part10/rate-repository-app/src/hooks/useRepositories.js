import { useQuery } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (props) => {
  const [repositories, setRepositories] = useState()

  const variables = {
    orderBy: props?.orderBy,
    orderDirection: props?.orderDirection,
    searchKeyword: props?.searchKeyword,
    first: props?.first,
  }

  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
    }
  )

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    } else {
      fetchMore({
        query: GET_REPOSITORIES,
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const nextResult = {
            repositories: {
              ...fetchMoreResult.repositories,
              edges: [
                ...previousResult.repositories.edges,
                ...fetchMoreResult.repositories.edges,
              ],
            },
          }

          return nextResult
        },
      })
    }
  }

  useEffect(() => {
    setRepositories(data?.repositories)
  }, [data])

  return { repositories, error, loading, fetchMore: handleFetchMore, ...result }
}

export default useRepositories
