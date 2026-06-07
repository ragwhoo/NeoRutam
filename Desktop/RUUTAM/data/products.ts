export interface Product {
  src: string;
  alt: string;
  title: string;
  price?: string;
}

export const products: Product[] = [
  {
    src: "/images/products/coconut-oil-1.jpg",
    alt: "Virgin Coconut Oil",
    title: "Pure Virgin Coconut Oil",
    price: "₹299",
  },
  {
    src: "/images/products/coconut-oil-2.jpg",
    alt: "Cold Pressed Coconut Oil",
    title: "Cold Pressed Coconut Oil",
    price: "₹349",
  },
  {
    src: "/images/products/coconut-oil-3.jpg",
    alt: "Organic Coconut Oil",
    title: "Organic Coconut Oil",
    price: "₹399",
  },
  {
    src: "/images/products/coconut-oil-4.jpg",
    alt: "Coconut Hair Oil",
    title: "Coconut Hair Oil",
    price: "₹249",
  },
  {
    src: "/images/products/coconut-oil-5.jpg",
    alt: "Coconut Body Oil",
    title: "Coconut Body Oil",
    price: "₹449",
  },
];
