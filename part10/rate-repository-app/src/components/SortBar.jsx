import React from 'react'
import Select from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import { StyleSheet, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

const Filter = ({filter, setFilter}) => {
  const onChange = query => setFilter(query)
  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChange}
      value={filter}
    />
  )
}

const SortBar = ({filter, setFilter, sort, setSort, order, setOrder, direction, setDirection}) => {
  const onValueChange = (value) => {
    switch (value) {
      case 'new':
        setSort('new')
        setOrder('CREATED_AT')
        setDirection('DESC')
        break
      case 'old':
        setSort('old')
        setOrder('CREATED_AT')
        setDirection('ASC')
        break
      case 'highestRated':
        setSort('highestRated')
        setOrder('RATING_AVERAGE')
        setDirection('DESC')
        break
      case 'lowestRated':
        setSort('lowestRated')
        setOrder('RATING_AVERAGE')
        setDirection('ASC')
        break
      default:
        setOrder(order)
        setDirection(direction)
    }
  }

  return (
    <View style={styles.container}>
      <Filter filter={filter} setFilter={setFilter} />
      <Select 
        onValueChange={value=>onValueChange(value)} 
        Icon={Chevron}
        value={sort}
        items={[
          {label: 'New', value: 'new'},
          {label: 'Old', value:'old'},
          {label: 'Highest rated', value: 'highestRated'},
          {label: 'Lowest rated', value: 'lowestRated'}
        ]}
        style={pickerSelectStyles}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'darkgray'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: 'darkgray',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'darkgray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 18,
    right: 18,
  }
})

export default SortBar