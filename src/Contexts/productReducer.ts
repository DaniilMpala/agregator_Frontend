import {createContext} from "react"

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


export const initialState = []

export const product = createContext<IProduct>({
    state: initialState,
    dispatch: () => {console.log("Dispatch не работает")}
})

export const productReducer = (state: API$ProductInfo[], action: IProductReducerAction) => {
    switch(action.type) {
        // case 'test_update':
        //     return {
        //         ...state,
        //         ...action.payload
        //     };
        default:
            return state
    }
};