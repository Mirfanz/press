import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center w-full h-full px-4">
      {children}
    </div>
  );
}
