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
      label: "Berita",
      href: "/news",
    },
    {
      label: "Keuangan",
      href: "/cash",
    },
  ],
  navMenuItems: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Berita",
      href: "/news",
    },
    {
      label: "Keuangan",
      href: "/cash",
    },
  ],
  links: {
    github: "https://github.com/mirfanz",
    instagram: "https://twitter.com/getnextui",
    whatsapp: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
