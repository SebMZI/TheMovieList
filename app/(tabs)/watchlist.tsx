
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Watchlist() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272727' }}>
      <Header/>
      <MovieList/>
    </SafeAreaView>
  );
}

