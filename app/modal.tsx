import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMovie } from '../context/MovieContext';

export default function Modal() {
  const { selectedMovie } = useMovie();
  console.log(selectedMovie);

  const isLoading = !selectedMovie || !selectedMovie.poster_url;

  if (isLoading) {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#FFA629" />
    </View>
  );
}

  return (
    
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{uri: selectedMovie.poster_url || "" }} style={styles.movie_modal__img}/>
      <View style={styles.movie_modal__details}>
        <View style={styles.movie_modal__header}>
          <Text style={styles.movie_modal__title} numberOfLines={2} ellipsizeMode='tail'>{selectedMovie.title || "No title"}</Text>
          <Image source={require("../assets/images/icons/icon_eye.png")} style={{width: 24, height: 24}}/>
        </View>
        <View style={styles.movie_modal_rating}>
          {
              Array.from({ length: selectedMovie.vote_average}).map((_, index) => (
                  <Image key={index} source={require("../assets/images/icons/icon_star_yellow.png")} style={styles.movie_modal_star__img}/>
              ))
          }
          </View>
      </View>
      <View>
        <Text style={{color: "white", paddingBlock: 8}} numberOfLines={2} ellipsizeMode='tail'>{`With ${selectedMovie.cast || "Unknown cast"}`}</Text>
      </View>
      <View style={styles.movie_modal__btn}>
        <Button title='Add to watchlist' color="black" onPress={() => {}} />
      </View>
      <View >
        <Text style={styles.movie_modal_overview__title}>Overview</Text>
        <Text style={styles.movie_modal_overview__detail}>{selectedMovie.overview}</Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.movie_modal_infos__title}>Details</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <Text style={{color: "white", fontWeight: '700', paddingRight: 20}}>Date</Text>
          <Text style={{color: "white"}}>{selectedMovie.air_date 
            ? new Date(selectedMovie.air_date).toLocaleDateString("en-EN",{day: '2-digit', month: 'short', year: 'numeric'}) 
            : "Unknown"}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <Text style={{color: "white", fontWeight: '700', paddingRight: 20}}>Producers</Text>
          <Text style={{color: "white", width: "70%", textAlign: "right"}}>{selectedMovie.producers || "Unknown"}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    borderRadius: 10,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  movie_modal__img: {
    aspectRatio: 2/3,
    borderRadius: 10,
    width: '85%',
    marginInline: 'auto',
  },
  movie_modal__details:{
    marginTop: 32
  },
  movie_modal__header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movie_modal__title:{
    fontSize: 24,
    fontWeight: '700',
    color: "white",
    width: '80%',
  },
  movie_modal_rating: {
    marginTop: 8,
    flexDirection: 'row',
    position: 'relative',
    left: -2,
  },
  movie_modal_star__img: {
    width: 16,
    height: 16
  },
  movie_modal__btn:{
    backgroundColor: "#FFA629",
    borderRadius: 10,
    width: '100%',
    marginTop: 12,
    marginBottom: 30,
    paddingVertical: 6,
  },
  movie_modal_overview__title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10
  },
  movie_modal_overview__detail:{
    color: 'white',
  },
   movie_modal_infos__title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10
  },
  movie_modal_infos__detail:{
    color: 'white',
  },
});
