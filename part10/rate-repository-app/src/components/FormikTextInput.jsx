import React from 'react'
import { StyleSheet } from 'react-native'
import { useField } from 'formik'
import TextInput from './TextInput'
import Text from './Text'
import theme from '../theme'

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  const borderColor = () => {
    return showError ? theme.colors.error : 'black'
  }

  const styles = StyleSheet.create({
    errorText: {
      color: theme.colors.error,
    },
    textInput: {
      borderStyle: 'solid',
      borderColor: borderColor(),
      borderWidth: 1,
      borderRadius: 3,
      paddingLeft: 10,
      marginTop: 10,
      height: 30,
    },
  })

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={styles.textInput}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
