import { useFavourites } from "@/context/favourites";
import { Button } from "@/modules/common/components/ui/button";
import { Pokemon } from "@/types/pokemon";
import { Heart } from "lucide-react";

export default function FavButton({ pokemon }: { pokemon: Pokemon }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const isCurrentlyFavourite = isFavourite(pokemon.id);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(pokemon);
  };
  return (
    <Button
      size="sm"
      variant="ghost"
      className={`absolute top-2 left-2 z-10 p-2 rounded-full shadow-lg transition-all duration-200 ${
        isCurrentlyFavourite
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-white/90 hover:bg-white text-gray-600 hover:text-red-500"
      }`}
      onClick={handleFavouriteClick}
    >
      <Heart
        className={`w-4 h-4 ${isCurrentlyFavourite ? "fill-current" : ""}`}
      />
    </Button>
  );
}
