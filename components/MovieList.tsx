import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MovieCard from './MovieCard';

const MovieList = ({movies}) => {
    
  return (
    <View>
        <FlatList
            data={movies}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.movie_container}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({item}) => (
                <View style={styles.cardWrapper}>
                  <MovieCard movie={item}/>
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
    paddingBottom: 80
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