import { gql } from 'apollo-boost'
import { REPOSITORY_NODE_DETAILS, REVIEW_NODE_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...RepositoryParts
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${REPOSITORY_NODE_DETAILS}
`

export const ME = gql`
  query me($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id
      username
      reviewCount
      createdAt
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewParts
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${REVIEW_NODE_DETAILS}
`

export const GET_REPOSITORY_BY_ID = gql`
  query findRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryParts
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewParts
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${REPOSITORY_NODE_DETAILS}
  ${REVIEW_NODE_DETAILS}
`
