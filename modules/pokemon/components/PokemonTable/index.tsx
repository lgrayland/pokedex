import { listPokemon } from "@/lib/pokemon";
import { PokemonCard } from "../PokemonCard";
import Pagination from "./Pagination";

const PAGE_SIZE = 20;

export default async function PokemonTable({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  const { results } = await listPokemon({
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  });
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        pageCount={pageCount}
      />
    </>
  );
}
