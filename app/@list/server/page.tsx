import PokemonTable from "@/modules/pokemon/components/PokemonTable";

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
  return <PokemonTable currentPage={currentPage} pageCount={count} />;
}
