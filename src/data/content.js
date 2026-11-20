/** Editorial and navigational content for the homepage. */

export const navigation = [
  { label: 'New in', href: '#collection' },
  { label: 'Categories', href: '#categories' },
  { label: 'Our craft', href: '#craft' },
  { label: 'Reviews', href: '#reviews' },
];

export const marqueeItems = [
  'Hand-finished in Portugal',
  'Traceable full-grain leather',
  'Free repairs for life',
  'Carbon-neutral delivery',
  '30-day wear-it-out trial',
  'Small-batch, always',
];

export const heroStats = [
  { value: '12 yrs', label: 'of hand-finishing' },
  { value: '4.9/5', label: 'from 2,400 reviews' },
  { value: '30 days', label: 'wear-it-out trial' },
];

export const craftSteps = [
  {
    index: '01',
    title: 'Traceable materials',
    text: 'Full-grain leather from two family tanneries, recycled knits and natural rubber. Every material is listed, sourced and accounted for.',
  },
  {
    index: '02',
    title: 'Built to be resoled',
    text: 'Stitched, not glued. Our soles can be replaced at the atelier for as long as you wear them — usually within a week.',
  },
  {
    index: '03',
    title: 'Small-batch, slowly',
    text: 'Made in runs of 300 in a family workshop outside Porto. No overproduction, no end-of-season landfill, no shortcuts.',
  },
];

export const craftNotes = [
  { label: 'Atelier', value: 'Porto, Portugal' },
  { label: 'Made by', value: '38 artisans' },
  { label: 'Repairs', value: 'Free, for life' },
];

export const testimonials = [
  {
    id: 'amara',
    quote:
      'The most comfortable pair I own — and the only ones I’ve had resoled twice. They just keep getting better.',
    name: 'Amara Lindqvist',
    meta: 'Copenhagen · Atelier Chelsea',
    initials: 'AL',
    rating: 5,
    accent: '#c1532c',
  },
  {
    id: 'diego',
    quote:
      'I walked forty kilometres through Lisbon in the Terra Trails. Zero blisters, endless compliments.',
    name: 'Diego Ferreira',
    meta: 'Lisbon · Terra Trail',
    initials: 'DF',
    rating: 5,
    accent: '#1e352c',
  },
  {
    id: 'hana',
    quote:
      'Beautifully made, quietly confident. The kind of shoe you reach for without thinking — and keep for years.',
    name: 'Hana Mori',
    meta: 'Tokyo · Marlowe Loafer',
    initials: 'HM',
    rating: 5,
    accent: '#8a5a37',
  },
];

export const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'New arrivals', href: '#collection' },
      { label: 'Sneakers', href: '#collection' },
      { label: 'Boots', href: '#collection' },
      { label: 'Trail', href: '#collection' },
      { label: 'Sandals', href: '#collection' },
      { label: 'Gift cards', href: '#newsletter' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', href: '#craft' },
      { label: 'The atelier', href: '#craft' },
      { label: 'Journal', href: '#craft' },
      { label: 'Stockists', href: '#visit' },
      { label: 'Careers', href: '#visit' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping & returns', href: '#collection' },
      { label: 'Size guide', href: '#collection' },
      { label: 'Repairs & resoling', href: '#craft' },
      { label: 'Care guide', href: '#craft' },
      { label: 'Contact', href: '#visit' },
    ],
  },
];

export const store = {
  address: ['Lohaghara', 'Chittagong', 'Bangladesh'],
  hours: ['Mon–Fri · 10–18', 'Saturday · 10–16', 'Sunday · closed'],
  phone: '+880123456789',
  email: 'hello@solecraft.studio',
};

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { label: 'X', href: 'https://x.com', icon: 'x' },
];

export const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay'];

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price · low to high' },
  { value: 'price-desc', label: 'Price · high to low' },
  { value: 'newest', label: 'Newest first' },
];

export const newsletter = {
  eyebrow: 'The Sunday sole',
  titleTop: 'First dibs,',
  titleEm: 'always.',
  copy: 'New drops, atelier notes and early access to repairs. Two letters a month, nothing more.',
  note: 'By joining you agree to our privacy policy. Unsubscribe anytime.',
};
