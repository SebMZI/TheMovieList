import { findMedia } from "@/appwrite";
import { getProducers, getTopCast } from "./helpers";

export const fetchMovies = async (page = 1) => {
    const url = `https://api.themoviedb.org/3/trending/all/week?page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN_READ_API}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Failed to fetch movies: ' + errorText);
        }
        const data = await response.json()
        const result = (data.results ?? []).map((movie) => {
            return {...movie, poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`, title: movie?.title || movie?.name, cast: "", producers: "", tmdb_id: movie.id, vote_average: Math.round((movie?.vote_average / 10) * 5), air_date: movie.first_air_date || movie.release_date || ""}
        })
        return result;
    } catch (error) {
        throw new Error('Failed to fetch movies: ' + error);
    }
}

export const fetchMovieCredits = async (movieId: number) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN_READ_API}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Failed to fetch movie credits: ' + errorText);
        }
        const data = await response.json()
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch movie credits: ' + error);
    }
}

export const fetchSeriesCredits = async (seriesId: number) => {
    const url = `https://api.themoviedb.org/3/tv/${seriesId}/credits`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN_READ_API}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Failed to fetch TV credits: ' + errorText);
        }
        const data = await response.json()
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch TV credits: ' + error);
    }
}


export const searchMoviesAndSeries = async (query: string) => {
    if (!query) return [];

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN_READ_API}`
        }
    };

    try{

        const mediaInDB = await findMedia(query)

        if (mediaInDB && mediaInDB.length > 0){
            return mediaInDB
        }

        const mediaRes = await fetch(url, options)

        const mediaResults = await mediaRes.json()

        if (!mediaResults.results) return [];

       const mediaCredits = await Promise.all(mediaResults.results.map(async (media) => {
            if(media.media_type === "movie"){
                try {
                    const movieResults = await fetchMovieCredits(media.id)
                    media.cast = getTopCast(movieResults.cast)
                    media.producers = getProducers(movieResults.crew)
                } catch(e){ console.log(e) }
            } else {
                try {
                    const tvResults = await fetchSeriesCredits(media.id)
                    media.cast = getTopCast(tvResults.cast)
                    media.producers = getProducers(tvResults.crew)
                } catch(e){ console.log(e) }
            }

            return media; // 🔑 Must return it
        }))


        return mediaCredits.map((item) => {
            return {
                ...item, 
                title: item?.title || item?.name || "No Title",
                media_type: item.media_type,
                tmdb_id: item.id || 0,
                overview: item.overview || "",
                poster_url: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "",
                vote_average:  Math.round(((item.vote_average ?? 0) / 10) * 5) || 0,
                air_date: item.first_air_date || item.release_date || "",
            }
        })

     


    }catch(error){
        console.log(error)
    }


}