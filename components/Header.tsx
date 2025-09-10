import React from 'react'
import { Text, View } from 'react-native'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700', marginBlock: 20, fontFamily: 'Inter_900Black', textAlign: 'center' }}>TheMovieList</Text>
        <SearchBar/>
    </View>
  )
}

export default Header