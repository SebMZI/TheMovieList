import Loader from '@/assets/Loader';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MovieCard from './MovieCard';



const MovieList = ({movies, onEndReached, loading}) => {

  return (
    <View>
        <FlatList
            data={movies}
            keyExtractor={(item, index) =>
              item.id
                ? `${item.id}_${index}`
                : item.tmdbId
                ? `${item.tmdbId}_${index}`
                : `${Math.random()}_${index}`
            }
            numColumns={2}
            contentContainerStyle={styles.movie_container}
            columnWrapperStyle={styles.columnWrapper}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Loader/> : null}
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