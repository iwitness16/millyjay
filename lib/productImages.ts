export const DEFAULT_PRODUCT_FRONT_IMAGE = '/images/ordertemp.png';
export const UK_PRODUCT_FRONT_IMAGE = '/images/uk.jpg';

const UK_PRODUCT_SLUGS = new Set([
  'london',
  'birmingham',
  'bristol',
  'manchester',
  'liverpool',
  'leeds',
  'newcastle',
  'northernireland',
  'scotland',
  'wales',
]);

/** Maps normalized product names to image filenames in public/images. */
const PRODUCT_IMAGE_FILES: Record<string, string> = {
  alabama: 'alabama.jpg',
  arizona: 'arizona.jpg',
  arizona26: 'arizona26.jpg',
  british: 'british.jpg',
  britishcolumbia: 'britishcolumbia.jpg',
  california: 'california.jpg',
  colorado: 'colorado.jpg',
  connecticut: 'connecticut.jpg',
  delaware: 'delaware.jpg',
  florida: 'florida.jpg',
  georgia: 'georgia.jpg',
  indiana: 'indiana.jpg',
  kansas: 'kansas.jpg',
  maryland: 'maryland.jpg',
  massachusetts: 'massachusetts.jpg',
  michigan: 'michigan.jpg',
  minnesota: 'minnesota.jpg',
  mississippi: 'mississippi.jpg',
  missouri: 'missouri.jpg',
  nebraska: 'nebraska.jpg',
  nevada: 'nevada.jpg',
  newjersey: 'newjersey.jpg',
  newyork: 'newyork.jpg',
  northcarolina: 'northcarolina.jpg',
  ohio: 'ohio.jpg',
  ontario: 'ontario.jpg',
  pennsylvania: 'pennsylvania.jpg',
  quebec: 'quebec.jpg',
  rhodeisland: 'rhodeisland.jpg',
  southcarolina: 'southcarolina.jpg',
  ssn: 'ssn.png',
  tennessee: 'tennessee.jpg',
  texas: 'texas.jpg',
  uk: 'uk.jpg',
  utah: 'utah.jpg',
  virginia: 'virginia.jpg',
  washington: 'washington.jpg',
  wisconsin: 'wisconsin.jpg',
};

function productNameToSlug(productName: string): string {
  return productName.toLowerCase().replace(/\s+/g, '');
}

/** Returns the product-specific front image path, or the default template image. */
export function getProductFrontImage(productName: string): string {
  if (!productName) {
    return DEFAULT_PRODUCT_FRONT_IMAGE;
  }

  const slug = productNameToSlug(productName);
  const filename = PRODUCT_IMAGE_FILES[slug];
  if (filename) {
    return `/images/${filename}`;
  }
  if (UK_PRODUCT_SLUGS.has(slug)) {
    return UK_PRODUCT_FRONT_IMAGE;
  }
  return DEFAULT_PRODUCT_FRONT_IMAGE;
}
