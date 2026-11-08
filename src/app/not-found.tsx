import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import NotFoundContent from "./(site)/not-found";

export default function RootNotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
