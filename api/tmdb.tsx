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
        
        return data;
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