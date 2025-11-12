import { Skeleton } from "@/modules/common/components/ui/skeleton";
import PokemonTable from "@/modules/pokemon/components/PokemonTable";
import { Suspense } from "react";

export default async function ServerListPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { count } = await fetch("https://pokeapi.co/api/v2/pokemon").then(
    (res) => res.json()
  );
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
      <Suspense key={currentPage} fallback={<Skeleton />}>
        <PokemonTable currentPage={currentPage} pageCount={count} />
      </Suspense>
    </div>
  );
}
