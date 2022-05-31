
type API$ListItems = Record<API$ProductInfo[]>
type API$ReceivedProductsInfoList = Record<string, API$ListItems[]>
// type API$ReceivedProductsInfo = Record<number, API$ProductInfo[]>

interface API$ProductInfo {
  img: string | null;
  description: string;
  value: number;
  promoPercent: number;

  _id: number;

  valueSymbol: number;
  symbol: string;

  shopsImg: string;
  titleShops: string 
  promoEnd: Date;
  promoStart: Date;

  productUrl?: string;
  textDate?: string;
  availabilityShop?: null | string
  oldValue?: null | number
  stockValue?: null | string

}

interface API$Filter {
  v: string;
  desc?: string;
  label?:string
}

interface API$FiltersData {
  shops: API$Filter[];
  brand: API$Filter[];
  category: API$Filter[];
  minPrice: number;
  maxPrice: number;
  sortedBy: API$Filter[]
}
interface API$FilterRequestLoadItem {
  search?: string
  category?: string[]
  skip?: number
  shops?: string[]
  sortedBy?: number
  brand?: string[]
  price?: number[]
}
