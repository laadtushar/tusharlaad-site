import {
  Console,
  Experience,
  Footer,
  Lab,
  Ledger,
  Quotes,
} from "@/components/sections";
import { StoryThread } from "@/components/story-thread";

export default function Home() {
  return (
    <main className="pb-8 pt-6 sm:pt-10">
      <Console />
      {/* The thread starts where the hero's field resolves and carries the
          line through every section to the footer. */}
      <StoryThread>
        <Lab />
        <Quotes />
        <Experience />
        <Ledger />
        <Footer />
      </StoryThread>
    </main>
  );
}
