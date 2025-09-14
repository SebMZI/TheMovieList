import React, { createContext, ReactNode, useContext, useState } from "react";

interface MovieContextType {
  selectedMovie: object;
  setSelectedMovie: React.Dispatch<React.SetStateAction<object>>;
  watchlist: object[];
  setWatchlist: React.Dispatch<React.SetStateAction<object[]>>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({children}: {children: ReactNode}) => {
    const [selectedMovie, setSelectedMovie] = useState<object>({});
    const [watchlist, setWatchlist] = useState<object[]>([]);
    
    return (
        <MovieContext.Provider value={{selectedMovie, setSelectedMovie, watchlist, setWatchlist}}>
            {children}
        </MovieContext.Provider>
    );
}

export const useMovie = () => useContext(MovieContext);