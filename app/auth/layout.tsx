import Footer from "@/components/footer";
import { AuthNavbar } from "@/components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-dvh">
      <AuthNavbar />
      <main className="container mx-auto max-w-7xl px-4 lg:px-6 flex-grow">
        <section className="flex flex-col items-center justify-center h-full">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}
