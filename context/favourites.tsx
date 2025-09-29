"use client";

import { Pokemon } from "@/types/pokemon";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface FavouritesContextType {
  favourites: Pokemon[];
  addToFavourites: (pokemon: Pokemon) => void;
  removeFromFavourites: (pokemonId: number) => void;
  isFavourite: (pokemonId: number) => boolean;
  toggleFavourite: (pokemon: Pokemon) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      try {
        setFavourites(JSON.parse(savedFavourites));
      } catch (error) {
        console.error("Error loading favourites from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (pokemon: Pokemon) => {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === pokemon.id)) {
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  const removeFromFavourites = (pokemonId: number) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== pokemonId));
  };

  const isFavourite = (pokemonId: number) => {
    return favourites.some((fav) => fav.id === pokemonId);
  };

  const toggleFavourite = (pokemon: Pokemon) => {
    if (isFavourite(pokemon.id)) {
      removeFromFavourites(pokemon.id);
    } else {
      addToFavourites(pokemon);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        toggleFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
}
