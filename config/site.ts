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
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
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
