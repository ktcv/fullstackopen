import { gql } from 'apollo-boost'
import { REPOSITORY_NODE_DETAILS } from './fragments'

export const AUTHORIZE = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      createdAt
      reviewCount
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      id
      user {
        id
        username
      }
      repository {
        ...RepositoryParts
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
  ${REPOSITORY_NODE_DETAILS}
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`
