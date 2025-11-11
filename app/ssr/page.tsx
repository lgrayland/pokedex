import { getQueryClient } from "@/lib/get-query-client";
import { listPokemon } from "@/lib/pokemon";
import PokemonScrollerWithQuery from "@/modules/pokemon/templates/PokemonScrollerWithQuery";
import { PageProps } from "@/types/common";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home({ searchParams }: PageProps) {
  const { page } = (await searchParams) || {};
  const pageNumber = Number(page) || 1;

  const queryClient = getQueryClient();

  // Prefetch all pages from 0 to the current page for SSR
  // This ensures we have all data for a continuous list
  await queryClient.fetchInfiniteQuery({
    queryKey: ["pokemonList", pageNumber],
    initialPageParam: 0,
    queryFn: listPokemon,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    pages: pageNumber, // Fetch pages 0 through pageNumber
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Pokédex SSR
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Discover and explore the wonderful world of Pokémon. Browse through
          the first generation of these amazing creatures.
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonScrollerWithQuery page={pageNumber} />
      </HydrationBoundary>
    </div>
  );
}
