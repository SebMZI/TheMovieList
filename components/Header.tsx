import React from 'react'
import { Text, View } from 'react-native'

const Header = () => {
  return (
    <View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700', marginBlock: 20, fontFamily: 'Inter_900Black', textAlign: 'center' }}>TheMovieList</Text>
    </View>
  )
}

export default Header