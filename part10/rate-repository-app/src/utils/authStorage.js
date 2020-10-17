import AsyncStorage from '@react-native-community/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(`${this.namespace}:key`)

    return rawToken ? JSON.parse(rawToken) : null
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:key`,
      JSON.stringify(accessToken)
    )
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:key`)
  }
}

export default AuthStorage
