import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-dvh">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-3 pt-2 lg:px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
    // <section className="py-3 md:py-6">
    //   <div className="inline-block max-w-lg text-center justify-center">
    //     {children}
    //   </div>
    // </section>
  );
}
