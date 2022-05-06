interface API$ProductInfo {
  img: string | null;
  title: string;
  price: number;
  promoPercent: number;

  id: number;

  valueSymbol: number;
  Symbol: string;

  shopsImg: string;
  promoEnd: Date;
  promoStart: Date;

  productUrl?: string;
  textDate?: string;
}

interface API$Filter {
  v: string;
  desc?: string;
}

interface API$FiltersData {
  shops: API$Filter[];
  brand: API$Filter[];
  minPrice: number;
  maxPrice: number;
}
interface API$FilterRequestLoadItem{
  search?: string
  category?: string[]
  skip?: number
  shops?: string[]
  sortedBy?: number
  brand?: string[]
  price?: number[]
}
