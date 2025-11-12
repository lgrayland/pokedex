export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Pokédex
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          A quick demo application showcasing various data fetching strategies
          using Next.js and Pokémon API.
        </p>
      </div>
    </div>
  );
}
