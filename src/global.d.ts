/// <reference types="react-scripts" />
interface IProductReducerAction {
    payload:Info[];
    type: string
}
interface IProduct {
    state: Info[];
    dispatch: React.Dispatch<IProductReducerAction>;
}
interface IOptionsFilter {
    maxPrice?: number;
    minPrice?: number;
    shops?:string[]
}
interface Info {
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
interface PropsShops {
    info: Info[];
}