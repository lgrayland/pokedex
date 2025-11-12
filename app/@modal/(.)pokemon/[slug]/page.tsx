import { getPokemon } from "@/lib/pokemon";
import Modal from "@/modules/pokemon/components/PokemonModal";
import { Pokemon } from "@/types/pokemon";
import { notFound } from "next/navigation";

export default async function PokemonModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pokemon: Pokemon | null = await getPokemon(slug);

  if (!pokemon) {
    notFound();
  }

  return <Modal pokemon={pokemon} />;
}
