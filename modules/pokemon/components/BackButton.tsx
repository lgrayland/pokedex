"use client";

import { Button } from "@/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="mb-6 hover:bg-primary/10"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Pokédex
    </Button>
  );
}
