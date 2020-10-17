import { gql } from 'apollo-boost'

export const REPOSITORY_NODE_DETAILS = gql`
  fragment RepositoryParts on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`

export const REVIEW_NODE_DETAILS = gql`
  fragment ReviewParts on Review {
    id
    repository {
      name
      id
    }
    text
    rating
    repositoryId
    createdAt
    user {
      id
      username
    }
  }
`
