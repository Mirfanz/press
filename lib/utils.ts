export const isProtected = (
  pathname: string
): "protected" | "unprotected" | "public" => {
  if (
    pathname === "/" ||
    pathname.startsWith("/cash/") ||
    pathname.startsWith("/news/")
  )
    return "protected";
  else if (pathname == "/auth/login") return "unprotected";
  else return "public";
};

export function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
    notation: "standard",
    signDisplay: "never",
  }).format(amount);
}
