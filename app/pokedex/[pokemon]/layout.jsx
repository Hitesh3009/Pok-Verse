export const metadata = {
  title: "PokéVerse - Pokédex",
};

export default function PokemonDataLayout({ children }) {
  return (
    <section className="min-w-full min-h-full">{children}</section>
  );
}
