import { listPokemon } from "@/lib/pokemon";
import { Pokemon } from "@/types/pokemon";
import { useMemo, useState } from "react";

export const usePokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  async function* pokemon(limit: number) {
    let offset = 0;
    while (true) {
      try {
        setIsLoading(true);
        const pokemon = await listPokemon({ limit, offset });
        setIsLoading(false);
        setPokemonData((prev: Pokemon[]) => [...prev, ...pokemon]);
        offset = offset + limit;

        yield pokemon;
      } catch (err) {
        break;
      }
    }
  }

  const pokemonGenerator = useMemo(() => pokemon(20), []);

  return {
    pokemonData,
    pokemonGenerator,
    isLoading,
  };
};
