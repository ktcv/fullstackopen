import React from 'react'
import * as yup from 'yup'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import theme from '../theme'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../graphql/mutations'
import { useHistory } from 'react-router-native'
import useSignIn from '../hooks/useSignIn'

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
  confirmPassword: ''
}

const SignUpForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <Text fontWeight='bold'>Register an account</Text>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput name='confirmPassword' placeholder='Confirm password' secureTextEntry />
      <TouchableWithoutFeedback>
        <Text style={styles.button} onPress={onSubmit}>Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Username must be at least 3 characters').max(15, 'Maximum 15 characters').required('Username is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').max(15, 'Maximum 15 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Enter password again')
})

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER)
  const [signInHook] = useSignIn()
  const history = useHistory()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await mutate({ variables: { username, password }})
      await signInHook({username: data.createUser.username, password})
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp