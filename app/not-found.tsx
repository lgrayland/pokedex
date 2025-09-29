import { Button } from "@/modules/common/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">
          Oops! This Pokemon got away!
        </h1>

        <p className="text-muted-foreground mb-8 text-pretty">
          The page you&apos;re looking for seems to have wandered off into the
          tall grass. Let&apos;s get you back to catching them all!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">Back to Pokedex</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/favorites">View Favorites</Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">All Pokemon</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/favorites">My Favorites</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
