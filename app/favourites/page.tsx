"use client";

import { useFavourites } from "@/context/favourites";
import { Button } from "@/modules/common/components/ui/button";
import { PokemonCard } from "@/modules/pokemon/components/PokemonCard";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pokédex
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-foreground">
              Favourite Pokemon
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {favourites.length === 0
              ? "You haven't added any Pokemon to your favourites yet."
              : `You have ${favourites.length} favourite Pokemon.`}
          </p>
        </div>

        {favourites.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                No favourites yet
              </h2>
              <p className="text-muted-foreground">
                Start exploring Pokemon and click the heart icon to add them to
                your favourites!
              </p>
              <Link href="/">
                <Button className="mt-4">Explore Pokemon</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favourites.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
