import { fetchMovies, searchMoviesAndSeries } from "@/api/tmdb";
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(async (nextPage = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try{
      const data = await fetchMovies(nextPage);
      setMovies(prev => nextPage === 1 ? data : [...prev, ...data]);
      setHasMore(data.length > 0);
      setPage(nextPage);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }, [loading, hasMore]);

  const fetchMovie = async (query) => {
     return await searchMoviesAndSeries(query)
  }



  useEffect(() => {
    loadMovies(1);
  }, [])

  const handleEndReached = () => {
    if (!loading && hasMore) {
      loadMovies(page + 1);
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#272727' }}>
      <Header fetchMovie={fetchMovie}/>
      <MovieList movies={movies} onEndReached={handleEndReached} loading={loading} />
    </SafeAreaView>
  );
}

