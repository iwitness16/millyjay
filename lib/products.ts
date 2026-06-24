import { getProductFrontImage, DEFAULT_PRODUCT_FRONT_IMAGE, UK_PRODUCT_FRONT_IMAGE } from './productImages';

export type ProductCategory =
  | 'USA ID'
  | 'CANADA ID'
  | 'UK ID'
  | 'SSN'
  | 'ARGENTINA ID'
  | 'AUSTRALIA ID'
  | 'FRANCE ID'
  | 'GERMANY ID'
  | 'IRELAND ID'
  | 'ITALY ID'
  | 'NETHERLANDS ID'
  | 'SPAIN ID';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
}

export interface CountryMeta {
  category: ProductCategory;
  code: string;
  name: string;
  flag: string;
  description: string;
  currencySymbol: string;
  price: number;
}

const CANADA_ONTARIO_FALLBACK = '/images/ontario.jpg';

const CATEGORY_FALLBACK_IMAGES: Partial<Record<ProductCategory, string>> = {
  'ARGENTINA ID': '/images/argentina_ft.png',
  'AUSTRALIA ID': '/images/australia_ft.png',
  'FRANCE ID': '/images/france_ft.png',
  'GERMANY ID': '/images/germany_ft.png',
  'IRELAND ID': '/images/ireland_ft.png',
  'ITALY ID': '/images/italy_ft.png',
  'NETHERLANDS ID': '/images/netherlands_ft.png',
  'SPAIN ID': '/images/spain_ft.png',
  'CANADA ID': CANADA_ONTARIO_FALLBACK,
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function imageFor(name: string, category: ProductCategory): string {
  const front = getProductFrontImage(name);
  if (front !== DEFAULT_PRODUCT_FRONT_IMAGE) return front;
  if (category === 'UK ID') return UK_PRODUCT_FRONT_IMAGE;
  return CATEGORY_FALLBACK_IMAGES[category] ?? DEFAULT_PRODUCT_FRONT_IMAGE;
}

function makeProducts(
  names: string[],
  category: ProductCategory,
  price: number
): Product[] {
  return names.map((name) => ({
    id: slugify(name),
    name,
    category,
    price,
    image: imageFor(name, category),
  }));
}

const USA_STATES = [
  'Alabama', 'Arizona', 'California', 'California CM1', 'Connecticut', 'Delaware',
  'Florida', 'Florida Motorcycle', 'Georgia', 'Illinois', 'Indiana', 'Kansas',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Nebraska', 'Nevada', 'New Jersey', 'New York Old Verison', 'North Carolina',
  'Ohio', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'California CDL', 'Illinois CDL', 'New York CDL',
  'Ohio CDL', 'Pennsylvania CDL', 'Texas CDL',
];

const CANADA_STATES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland',
  'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec',
];

const UK_STATES = [
  'London', 'Newcastle', 'Wales', 'Scotland', 'Northern Ireland', 'Birmingham',
  'Manchester', 'Liverpool', 'Leeds', 'Bristol',
];

export const COUNTRIES: CountryMeta[] = [
  {
    category: 'USA ID',
    code: 'US',
    name: 'USA',
    flag: '🇺🇸',
    description: 'All US states with holograms and UV features',
    currencySymbol: '$',
    price: 100,
  },
  {
    category: 'UK ID',
    code: 'UK',
    name: 'UK',
    flag: '🇬🇧',
    description: 'UK driving licences with UV features',
    currencySymbol: '£',
    price: 80,
  },
  {
    category: 'CANADA ID',
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'Canadian provincial IDs with holograms',
    currencySymbol: '$',
    price: 100,
  },
  {
    category: 'ARGENTINA ID',
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    description: 'Argentine IDs with UV security features',
    currencySymbol: 'AR$',
    price: 100,
  },
  {
    category: 'AUSTRALIA ID',
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    description: 'Australian state licences with holograms',
    currencySymbol: 'A$',
    price: 100,
  },
  {
    category: 'FRANCE ID',
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    description: 'French IDs with UV and hologram features',
    currencySymbol: '€',
    price: 100,
  },
  {
    category: 'GERMANY ID',
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    description: 'German IDs with security features',
    currencySymbol: '€',
    price: 100,
  },
  {
    category: 'IRELAND ID',
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    description: 'Irish IDs with UV features',
    currencySymbol: '€',
    price: 100,
  },
  {
    category: 'ITALY ID',
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    description: 'Italian IDs with hologram features',
    currencySymbol: '€',
    price: 100,
  },
  {
    category: 'NETHERLANDS ID',
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    description: 'Dutch IDs with UV security',
    currencySymbol: '€',
    price: 100,
  },
  {
    category: 'SPAIN ID',
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    description: 'Spanish IDs with hologram features',
    currencySymbol: '€',
    price: 100,
  },
  {
    category: 'SSN',
    code: 'ID',
    name: 'SSN',
    flag: '🪪',
    description: 'Social Security cards',
    currencySymbol: '$',
    price: 100,
  },
];

const allProductsUnsorted: Product[] = [
  ...makeProducts(USA_STATES, 'USA ID', 100),
  ...makeProducts(CANADA_STATES, 'CANADA ID', 100),
  ...makeProducts(UK_STATES, 'UK ID', 80),
  ...makeProducts(
    ['Buenos Aires', 'Cordoba', 'Mendoza', 'Rosario', 'Tucuman'],
    'ARGENTINA ID',
    100
  ),
  ...makeProducts(
    ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
    'AUSTRALIA ID',
    100
  ),
  ...makeProducts(['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'], 'FRANCE ID', 100),
  ...makeProducts(['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart'], 'GERMANY ID', 100),
  ...makeProducts(['Dublin', 'Cork', 'Galway', 'Limerick'], 'IRELAND ID', 100),
  ...makeProducts(['Rome', 'Milan', 'Naples', 'Turin', 'Florence'], 'ITALY ID', 100),
  ...makeProducts(['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague'], 'NETHERLANDS ID', 100),
  ...makeProducts(['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'], 'SPAIN ID', 100),
  ...makeProducts(['SSN'], 'SSN', 100),
];

export const ALL_PRODUCTS: Product[] = allProductsUnsorted.sort((a, b) =>
  a.name.localeCompare(b.name)
);

export const PRODUCT_CATEGORIES: ProductCategory[] = COUNTRIES.map((c) => c.category);

export function getCountryMeta(category: ProductCategory): CountryMeta | undefined {
  return COUNTRIES.find((c) => c.category === category);
}

/** ISO 3166-1 alpha-2 for flagcdn.com (UK uses gb). */
const FLAG_ISO: Record<string, string> = {
  UK: 'gb',
  US: 'us',
  CA: 'ca',
  AR: 'ar',
  AU: 'au',
  FR: 'fr',
  DE: 'de',
  IE: 'ie',
  IT: 'it',
  NL: 'nl',
  ES: 'es',
};

export function getCountryFlagUrl(code: string, size = 40): string {
  const iso = FLAG_ISO[code];
  if (!iso) return '';
  return `https://flagcdn.com/w${size}/${iso}.png`;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function findProductByName(name: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.name === name);
}

/** Resolves display image including category fallbacks (matches product list). */
export function getProductImage(name: string): string {
  const product = findProductByName(name);
  return product?.image ?? getProductFrontImage(name);
}

export function isUKProduct(name: string): boolean {
  const product = findProductByName(name);
  return product?.category === 'UK ID';
}

export function getProductPrice(name: string): number {
  const product = findProductByName(name);
  if (product) return product.price;
  return isUKProduct(name) ? 80 : 100;
}

export function formatProductPrice(product: Product): string {
  const meta = getCountryMeta(product.category);
  const symbol = meta?.currencySymbol ?? '$';
  return `${symbol}${product.price}`;
}

export function formatPriceForProduct(name: string, price?: number): string {
  const product = findProductByName(name);
  const amount = price ?? product?.price ?? getProductPrice(name);
  const meta = product ? getCountryMeta(product.category) : undefined;
  if (meta) return `${meta.currencySymbol}${amount}`;
  return isUKProduct(name) ? `£${amount}` : `$${amount}`;
}
