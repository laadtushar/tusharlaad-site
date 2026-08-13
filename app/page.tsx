import {
  Console,
  Experience,
  Footer,
  Lab,
  Ledger,
  Quotes,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="pb-8 pt-6 sm:pt-10">
      <Console />
      <Lab />
      <Quotes />
      <Experience />
      <Ledger />
      <Footer />
    </main>
  );
}
