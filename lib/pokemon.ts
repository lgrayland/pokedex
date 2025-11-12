"use server";

import { ListPokemonResult } from "@/types/pokemon";

export async function getPokemon(slug: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
}

export async function listPokemon({
  limit = 20,
  offset,
  pageParam = 0,
}: {
  limit?: number;
  offset?: number;
  pageParam?: number;
}): Promise<ListPokemonResult> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
      offset ?? pageParam * limit
    }`
  );
  const data = await res.json();
  // fetch each pokemon to get pokemon details - could return reduced details rather than whole object
  const results = await Promise.all(
    data.results.map((pokemon: { url: string }) =>
      fetch(pokemon.url).then((res) => res.json())
    )
  );
  const { count, next, previous } = data;
  const nextPageParam = pageParam * limit < data.count ? pageParam + 1 : null;

  return { results, nextPageParam, count, next, previous };
}
