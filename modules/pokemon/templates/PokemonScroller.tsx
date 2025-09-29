"use client";

import InfiniteScroller from "@/modules/common/components/InfiniteScroller";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonCard } from "../components/PokemonCard";
import { Skeleton } from "@/ui/skeleton";

export default function PokemonScroller() {
  const { pokemonData, pokemonGenerator, isLoading } = usePokemon();

  return (
    <InfiniteScroller
      callback={async () => {
        await pokemonGenerator.next();
      }}
      isLoading={isLoading}
      loader={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </InfiniteScroller>
  );
}
