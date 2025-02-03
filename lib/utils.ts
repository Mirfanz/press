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
