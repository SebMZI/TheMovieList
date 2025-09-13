import React, { createContext, useContext, useState } from "react";

const MovieContext = createContext(null);

export const MovieProvider = ({children}) => {
    const [selectedMovie, setSelectedMovie] = useState({});
    const [watchlist, setWatchlist] = useState([]);
    
    return (
        <MovieContext.Provider value={{selectedMovie, setSelectedMovie, watchlist, setWatchlist}}>
            {children}
        </MovieContext.Provider>
    );
}

export const useMovie = () => useContext(MovieContext);