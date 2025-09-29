import FavLink from "@/modules/pokemon/components/FavLink";
import PokemonScroller from "@/modules/pokemon/templates/PokemonScroller";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <FavLink />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Pokédex
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Discover and explore the wonderful world of Pokémon. Browse through
          the first generation of these amazing creatures.
        </p>
      </div>
      <PokemonScroller />
    </div>
  );
}
