"use server";

import { Pokemon } from "@/types/pokemon";

export async function getPokemon(slug: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
}

export async function listPokemon({
  limit = 20,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}): Promise<Array<Pokemon>> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemonList = await res.json();
  const results = await Promise.all(
    pokemonList.results.map((pokemon: { url: string }) =>
      fetch(pokemon.url).then((res) => res.json())
    )
  );

  return results;
}
