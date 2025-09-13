import { fetchMovies } from "@/api/tmdb";
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data.results);
    };
    getMovies();
  }, []);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272727' }}>
      <Header/>
      <MovieList movies={movies}/>
    </SafeAreaView>
  );
}

