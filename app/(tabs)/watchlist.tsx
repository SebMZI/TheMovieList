
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

  const fetchMovie = (query: string) => {
    console.log("Fetch movie called with query:", query);
    const movieFound = watchlist.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()) || movie.cast.toLowerCase().includes(query.toLowerCase()) || movie.producers.toLowerCase().includes(query.toLowerCase()))
    console.log("Found movie called with query:", movieFound);
    return movieFound;
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272727' }}>
      <Header fetchMovie={fetchMovie}/>
      <MovieList movies={watchlist} onEndReached={() => {}} loading={false}/>
    </SafeAreaView>
  );
}

