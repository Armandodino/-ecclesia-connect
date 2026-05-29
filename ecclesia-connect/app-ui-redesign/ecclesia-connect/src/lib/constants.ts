export const PARISH_INFO = {
  name: "Paroisse Sainte-Thérèse",
  diocese: "Archidiocèse d'Abidjan",
  address: "Quartier Cocody, Abidjan, Côte d'Ivoire",
  phone: "+225 27 XX XX XX XX",
  email: "contact@ecclesia-connect.com",
  website: "https://ecclesia-connect.com",
  country: "Côte d'Ivoire",
  currency: "FCFA",
}

export const SAAS_CONFIG = {
  appName: "Ecclesia Connect",
  tagline: "La plateforme numérique des paroisses catholiques",
  description: "Écosystème numérique pour la vie de paroisse, diocèse et communauté chrétienne en Côte d'Ivoire et en Afrique francophone",
  supportEmail: "support@ecclesia-connect.com",
  supportPhone: "+225 07 XX XX XX XX",
}

export const LITURGICAL_SEASONS = {
  ADVENT: { name: "Avent", color: "#5B2C8E" },
  CHRISTMAS: { name: "Noël", color: "#D4AF37" },
  ORDINARY: { name: "Temps Ordinaire", color: "#1E3A5F" },
  LENT: { name: "Carême", color: "#6B2D5B" },
  EASTER: { name: "Temps Pascal", color: "#D4AF37" },
} as const

export const ANNOUNCEMENT_TYPES = [
  { value: "general", label: "Annonce générale", icon: "megaphone" },
  { value: "deces", label: "Décès", icon: "heart-crack" },
  { value: "mariage", label: "Mariage", icon: "heart" },
  { value: "bapteme", label: "Baptême", icon: "droplets" },
  { value: "confirmation", label: "Confirmation", icon: "hand" },
  { value: "pelerinage", label: "Pèlerinage", icon: "map-pin" },
  { value: "collecte", label: "Collecte", icon: "wallet" },
  { value: "reunion", label: "Réunion", icon: "users" },
] as const

export const SACRAMENTS = [
  { value: "bapteme", label: "Baptême", icon: "droplets" },
  { value: "communion", label: "Première Communion", icon: "cross" },
  { value: "confirmation", label: "Confirmation", icon: "hand" },
  { value: "mariage", label: "Mariage", icon: "heart" },
] as const

export const MOVEMENTS = [
  { value: "chorale", label: "Chorale", icon: "music" },
  { value: "enfants-choeur", label: "Enfants de chœur", icon: "baby" },
  { value: "jec", label: "JEC", icon: "graduation-cap" },
  { value: "coeur-vaillant", label: "Cœur Vaillant", icon: "shield" },
  { value: "legion-marie", label: "Légion de Marie", icon: "crown" },
  { value: "priere", label: "Groupe de Prière", icon: "pray" },
  { value: "jeunesse", label: "Jeunesse Catholique", icon: "zap" },
] as const

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/annonces", label: "Annonces", icon: "megaphone" },
  { href: "/calendrier", label: "Calendrier", icon: "calendar" },
  { href: "/messes", label: "Messes", icon: "church" },
  { href: "/sacrements", label: "Sacrements", icon: "cross" },
  { href: "/mouvements", label: "Mouvements", icon: "users" },
  { href: "/espace-spirituel", label: "Espace Spirituel", icon: "book-open" },
  { href: "/bibliotheque", label: "Bibliothèque", icon: "library" },
  { href: "/dons", label: "Dons", icon: "hand-heart" },
  { href: "/social", label: "Communauté", icon: "message-circle" },
  { href: "/admin", label: "Administration", icon: "settings" },
  { href: "/ia", label: "Assistant IA", icon: "bot" },
] as const

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  BISHOP: "bishop",
  PRIEST: "priest",
  DEACON: "deacon",
  SECRETARY: "secretary",
  GROUP_LEADER: "group_leader",
  MEMBER: "member",
} as const

export const PAYMENT_METHODS = [
  { value: "orange_money", label: "Orange Money", color: "#FF6600" },
  { value: "mtn_money", label: "MTN Money", color: "#FFCC00" },
  { value: "wave", label: "Wave", color: "#00D4FF" },
  { value: "card", label: "Carte bancaire", color: "#1E3A5F" },
] as const

export const IVORIAN_CITIES = [
  "Abidjan",
  "Bouaké",
  "Daloa",
  "Yamoussoukro",
  "Korhogo",
  "San-Pédro",
  "Man",
  "Divo",
  "Gagnoa",
  "Abengourou",
] as const

export const ABIDJAN_QUARTIERS = [
  "Cocody",
  "Plateau",
  "Marcory",
  "Yopougon",
  "Abobo",
  "Koumassi",
  "Port-Bouët",
  "Treichville",
  "Adjame",
  "Bingerville",
] as const
