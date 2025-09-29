import { typeColors } from "@/modules/pokemon/helpers/typeColors";
import { getPokemon } from "@/lib/pokemon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { statNames } from "@/modules/pokemon/helpers/statNames";
import { Badge } from "@/ui/badge";
import { Pokemon } from "@/types/pokemon";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pokemon: Pokemon | null = await getPokemon(slug);

  if (!pokemon) {
    notFound();
  }

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pokédex
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-2">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="aspect-square relative bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden max-w-sm mx-auto">
                    {imageUrl ? (
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={pokemon.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-card-foreground capitalize">
                    {pokemon.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {pokemon.types.map((type) => (
                      <Badge
                        key={type.type.name}
                        className={`${
                          typeColors[type.type.name] || "bg-gray-400"
                        } text-white px-3 py-1 capitalize font-medium text-sm`}
                      >
                        {type.type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Base Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">
                      {statNames[stat.stat.name] || stat.stat.name}
                    </span>
                    <span className="font-bold text-primary">
                      {stat.base_stat}
                    </span>
                  </div>
                  <Progress
                    value={(stat.base_stat / 255) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Moves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {pokemon.moves.slice(0, 20).map((move) => (
                <Badge
                  key={move.move.name}
                  variant="secondary"
                  className="justify-center py-2 px-3 capitalize text-xs"
                >
                  {move.move.name.replace("-", " ")}
                </Badge>
              ))}
              {pokemon.moves.length > 20 && (
                <Badge
                  variant="outline"
                  className="justify-center py-2 px-3 text-xs"
                >
                  +{pokemon.moves.length - 20} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
