"use client";

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
import { useRouter } from "next/navigation";

export default function PokemonModal() {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>test</DialogContent>
    </Dialog>
  );
}
