export default function PokemonLayout({
  children,
  list,
}: {
  children: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <>
      {children}
      {list}
    </>
  );
}
