/// <reference types="react-scripts" />
interface IPriceSlider {
    selected:number[];
    static: number[]
}

// enum ProductActions {
//  count = 'count'
// }

// ProductActions.count

interface IProductReducerAction {
    payload: Info[];
    type: ProductActions
}

interface IProduct {
    state: Info[];
    dispatch: React.Dispatch<IProductReducerAction>;
}



interface IOptionsFilter {
    maxPrice: number;
    minPrice: number;
    shops:IArrayFilter[];
    brand: IArrayFilter[];
}

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

interface PropsShops {
    info: Info[];
}