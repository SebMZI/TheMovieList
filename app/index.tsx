import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
];

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272727' }}>
      <Header/>
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
    </SafeAreaView>
  );
}

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