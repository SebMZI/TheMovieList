
import { addToDatabase } from '@/appwrite';
import { useMovie } from '@/context/MovieContext';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const MovieCard = ({movie}: {movie: object}) => {
    const {setSelectedMovie, watchlist} = useMovie();
    
    const setMovie = async () => {
        setSelectedMovie({});
        const result = await addToDatabase(movie);  
        setSelectedMovie(result);
    }

    const isMovieViewed = watchlist.some((movieObject) => movieObject.tmdb_id === movie.tmdb_id && movieObject.movieViewed);

    return (
        <Link href="/modal" asChild>
            <TouchableOpacity onPress={() => setMovie()}>
                <View>
                    <View>
                        {
                            isMovieViewed && (
                                <View style={{position: 'absolute', zIndex: 1, backgroundColor: 'rgba(0,0,0,0.6)', width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require("../assets/images/icons/icon_eye.png")} style={{width: 24, height: 24}}/>
                                </View>
                            )
                        }

                        <Image source={{ uri: movie.poster_url}} style={styles.movie_card__img} />
                    </View>
                    <View style={styles.movie_card__info}>
                        <Text style={styles.movie_card__title} numberOfLines={2} ellipsizeMode='tail'>{movie.title || "No title"}</Text>
                        <View style={styles.movie_card_rating}>
                            {
                                Array.from({ length: movie.vote_average}).map((_, index) => (
                                    <Image key={index} source={require("../assets/images/icons/icon_star_yellow.png")} style={styles.movie_card_star__img}/>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
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