"use client";

import { useFavourites } from "@/context/favourites";
import { Badge } from "@/modules/common/components/ui/badge";
import { Button } from "@/modules/common/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavLink() {
  const { favourites } = useFavourites();

  return (
    <Link href="/favourites">
      <Button variant="outline" className="relative bg-transparent">
        <Heart className="w-4 h-4 mr-2" />
        Favourites
        {favourites.length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
            {favourites.length}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
