import React from 'react'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_REVIEW } from '../graphql/mutations'
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
  repositoryOwnerName: '',
  repositoryName: '',
  rating: null,
  reviewComments: '',
}

const ReviewForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <Text fontWeight='bold'>Review a repository</Text>
      <FormikTextInput name='ownerName' placeholder='Repository owner' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput name='reviewComments' multiline={true} height={100} placeholder='Comments' />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.button}>Submit review</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().min(3, 'Repository owner name must be at least 3 characters').required('Repository owner name is required'),
  repositoryName: yup.string().min(4, 'Repository name must be at least 4 characters').required('Repository name is required'),
  rating: yup.number().typeError('Rating must be a number').min(0, 'Minimum is 0').max(100, 'Maximum is 100').required('Rating is required'),
  reviewComments: yup.string().min(10, 'Comment must be at least 10 characters')
})

const AddReviewPage = () => {
  const [mutate] = useMutation(CREATE_REVIEW)
  const history = useHistory()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, reviewComments } = values
  
    try {
      const { data } = await mutate({variables: {ownerName, repositoryName, rating: parseInt(rating, 10), text: reviewComments}})
      history.push(`/repositories/${data.createReview.repositoryId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({handleSubmit})=><ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default AddReviewPage