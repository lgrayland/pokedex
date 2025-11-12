"use client";

import { useFavourites } from "@/context/favourites";
import { Pokemon } from "@/types/pokemon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PokemonModal({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter();
  const { isFavourite, toggleFavourite } = useFavourites();

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;
  const isCurrentlyFavorite = isFavourite(pokemon.id);
  return (
    <Dialog
      defaultOpen
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="p-0 border-0 bg-transparent">
        <div className="mx-auto w-full">
          <div className="bg-black rounded-3xl p-2 shadow-2xl">
            <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-2xl p-6 relative">
              {/* Top Section with Blue Button */}
              <div className="flex items-start mb-8 gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg border-4 border-blue-300"></div>
                </div>

                {/* Indicator LEDs */}
                <div className="flex  gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-black"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg border-2 border-black"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-black"></div>
                </div>
              </div>

              {/* Screen Area - White Bezel */}
              <div className="bg-gray-100 rounded-2xl p-3 mb-6 border-8 border-gray-300 shadow-inner">
                {/* Screen Indicator Dots */}
                <div className="flex justify-end gap-1 mb-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                </div>

                {/* LCD Display - Dark Gray Screen */}
                <div className="bg-gray-600 rounded-lg p-3 aspect-square flex items-center flex-col justify-center border-4 border-gray-700">
                  {imageUrl ? (
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={pokemon.name}
                      width={180}
                      height={180}
                      className="drop-shadow"
                    />
                  ) : (
                    <div className="text-gray-400 text-center text-sm">
                      No Data
                    </div>
                  )}
                  <div className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                    {pokemon.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    No. #{pokemon.id.toString().padStart(3, "0")}
                  </div>
                </div>

                {/* Bottom Screen Details */}
                <div className="flex justify-between items-end mt-2">
                  <button
                    onClick={() => toggleFavourite(pokemon)}
                    className={`w-6 h-6 rounded-full shadow-lg transition-all ${
                      isCurrentlyFavorite
                        ? "bg-red-600 scale-110"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  ></button>
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-3 bg-gray-800 rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Control Area */}
              <div className="flex justify-between items-end gap-4">
                {/* Left - Gray Button */}
                <div className="flex flex-col items-center gap-2">
                  <Link
                    className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-gray-600"
                    href={`/pokemon/${pokemon.name}`}
                    onNavigate={(e) => {
                      e.preventDefault();
                      window.location.href = `/pokemon/${pokemon.name}`;
                    }}
                  ></Link>
                  <div className="text-white text-xs font-bold">SEL</div>
                </div>

                {/* Center - Buttons */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <button className="w-6 h-6 bg-red-500 rounded shadow-lg hover:shadow-xl transition border border-red-600"></button>
                    <button className="w-6 h-6 bg-cyan-400 rounded shadow-lg hover:shadow-xl transition border border-cyan-500"></button>
                  </div>
                </div>

                {/* Right - D-Pad */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-4 bg-gray-800 rounded-t border-2 border-gray-900 shadow-lg"></div>
                  <div className="flex gap-0.5">
                    <div className="w-4 h-8 bg-gray-800 rounded-l border-2 border-gray-900 shadow-lg"></div>
                    <div className="w-4 h-8 bg-gray-800 rounded-r border-2 border-gray-900 shadow-lg"></div>
                  </div>
                  <div className="w-8 h-4 bg-gray-800 rounded-b border-2 border-gray-900 shadow-lg"></div>
                </div>
              </div>

              {/* Bottom Green Button */}
              <div className="mt-6 flex justify-center">
                <button className="w-24 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-lg shadow-lg hover:shadow-xl transition border-2 border-green-700"></button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
