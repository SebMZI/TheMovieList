
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import { useMovie } from "@/context/MovieContext";
import { getData } from "@/storage/asyncStorage";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Watchlist() {
  const {watchlist, setWatchlist} = useMovie();

  const getMovies = async () => {
    try{
      const response = await getData();
      if(response){
        setWatchlist(response);
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272727' }}>
      <Header/>
      <MovieList movies={watchlist} onEndReached={() => {}} loading={false}/>
    </SafeAreaView>
  );
}

