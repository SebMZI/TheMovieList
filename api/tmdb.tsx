export const fetchMovies = async () => {
    const url = 'https://api.themoviedb.org/3/trending/all/week';
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
