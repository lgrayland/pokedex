"use client";

import InfiniteScroller from "@/modules/common/components/InfiniteScroller";
import { PokemonCard } from "../components/PokemonCard";
import { Skeleton } from "@/ui/skeleton";
import { useInfinitePokemons } from "../hooks/useInfinitePokemons";
import { Fragment } from "react";

export default function PokemonScrollerWithQuery({ page }: { page: number }) {
  const { pokemonData, fetchNextPage, isFetching } = useInfinitePokemons({
    page,
  });

  return (
    <InfiniteScroller
      callback={fetchNextPage}
      isLoading={isFetching}
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
        {pokemonData?.pages.map(({ results }, i) => (
          <Fragment key={i}>
            {results.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Fragment>
        ))}
      </div>
    </InfiniteScroller>
  );
}
