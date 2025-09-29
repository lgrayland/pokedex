import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import { typeColors } from "../helpers/typeColors";
import FavButton from "./FavButton";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className="relative">
      <Link href={`/pokemon/${pokemon.name}`} className="block">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 cursor-pointer">
          <CardContent className="p-6">
            <div className="relative mb-4">
              <div className="aspect-square relative bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={pokemon.name}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                #{pokemon.id.toString().padStart(3, "0")}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-card-foreground capitalize text-center">
                {pokemon.name}
              </h3>

              <div className="flex flex-wrap gap-1 justify-center">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.type.name}
                    className={`${
                      typeColors[type.type.name] || "bg-gray-400"
                    } text-white text-xs px-2 py-1 capitalize font-medium`}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      <FavButton pokemon={pokemon} />
    </div>
  );
}
