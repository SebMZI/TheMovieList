import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import MovieCard from './MovieCard'

const MovieList = () => {
    const DATA = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    ];
    
  return (
    <View>
        <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.movie_container}
                columnWrapperStyle={styles.columnWrapper}
            renderItem={() => (
                <View style={styles.cardWrapper}>
                <MovieCard rating={5}/>
                </View>
            )}
        />
    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({
  movie_container: {
    padding: 16,
  },
  columnWrapper: {
    gap: 10,
  },
  cardWrapper: {
    flex: 1,
    padding: 8,
    marginBottom: 16,
  },
});