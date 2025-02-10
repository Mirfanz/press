export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PRESS II",
  description: "Salam satu mesin",
  navItems: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Keuangan",
      href: "/finance",
    },
    {
      label: "Kas",
      href: "/finance/tax",
    },
    {
      label: "Berita",
      href: "/news",
    },
  ],
  links: {
    github: "https://github.com/mirfanz",
    instagram: "https://instagram.com/mirfanz",
  },
};

export const monthString = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
