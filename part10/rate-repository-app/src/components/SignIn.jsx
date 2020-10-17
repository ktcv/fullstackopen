import React from 'react'
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  button: {
    marginTop: 10,
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

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .required('Username is required.'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters.')
    .required('Password is required.'),
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight='bold'>Sign in</Text>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

const SignIn = () => {
  const [signInHook] = useSignIn()
  const history = useHistory()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signInHook({ username, password })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
