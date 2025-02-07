export const isProtected = (
  pathname: string,
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

export function formatDate(date: Date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Compares two Date objects and returns true if the first date is older (earlier) than the second date.
 *
 * @param first - The first Date object to compare.
 * @param second - The second Date object to compare.
 * @returns value indicating whether the first date is [older] | equals | [later] than the second date.
 */
export function compareDate(first: Date, second: Date) {
  const firstDateOnly = new Date(
    first.getFullYear(),
    first.getMonth(),
    first.getDate(),
  );
  const secondDateOnly = new Date(
    second.getFullYear(),
    second.getMonth(),
    second.getDate(),
  );

  if (firstDateOnly.getTime() < secondDateOnly.getTime()) return "older";
  else if (firstDateOnly.getTime() == secondDateOnly.getTime()) return "equal";
  else return "later";
}
