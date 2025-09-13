
import { Image, StyleSheet, Text, View } from 'react-native';


const MovieCard = ({movie}: {movie: object}) => {
    const rating = Math.round((movie.vote_average / 10) * 5);
  return (
    <View>
        <Image source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}} style={styles.movie_card__img} />
        <View style={styles.movie_card__info}>
            <Text style={styles.movie_card__title} numberOfLines={2} ellipsizeMode='tail'>{movie.title || movie.name || "No title"}</Text>
            <View style={styles.movie_card_rating}>
                {
                    Array.from({ length: rating}).map((_, index) => (
                        <Image key={index} source={require("../assets/images/icons/icon_star_yellow.png")} style={styles.movie_card_star__img}/>
                    ))
                }
               </View>
        </View>
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({
    movie_card__img: {
        aspectRatio: 2/3,
        width: '100%',
        borderRadius: 10,
        flexShrink: 0,
    },
    movie_card__info: {
        marginTop: 10,
    },
    movie_card__title: {
        fontSize: 16,
        fontWeight: '700',
        color: "white",
        fontFamily: 'Inter_900Black',
        marginBottom: 2,
    },
    movie_card_star__img: {
        width: 16,
        height: 16
    },
    movie_card_rating: {
        flexDirection: 'row',
        position: 'relative',
        left: -2,
    }
});