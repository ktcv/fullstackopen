import { useMutation } from '@apollo/react-hooks'
import { AUTHORIZE } from '../graphql/mutations'
import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'
import { useApolloClient } from '@apollo/client'

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext)

  const apolloStore = useApolloClient()

  const [mutate, result] = useMutation(AUTHORIZE)

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } })
    const token = response.data.authorize.accessToken

    await authStorage.setAccessToken(token)
    apolloStore.resetStore()

    return response
  }

  return [signIn, result]
}

export default useSignIn
