import { createContext } from "react";

interface FetchBasket {
    type: BasketActionsTypes;
    payload: ProductsBasket;
}

type BasketAction = FetchBasket;


export enum BasketActionsTypes {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
}

export interface ProductsBasket {
    _id: number;
    img: string | null
    description: string
    value: number
    shopsImg: string
    titleShops: string
    promoEnd: Date
    promoStart: Date
}


type IProductContext = [
    state: Record<string, ProductsBasket[]>,
    dispatch: React.Dispatch<BasketAction>
];

export const initialState: Record<string, ProductsBasket[]> = {};

export const BasketContext = createContext<IProductContext>([
    initialState,
    () => {
        console.log("Dispatch не работает");
    },
]);

export const BasketReducer = (state: Record<string, ProductsBasket[]>, action: BasketAction) => {
    switch (action.type) {
        case BasketActionsTypes.ADD_ITEM:
            if (!(action.payload.titleShops in state)) state[action.payload.titleShops] = []

            state[action.payload.titleShops] = [...state[action.payload.titleShops], {
                _id: action.payload._id,
                img: action.payload.img,
                description: action.payload.description,
                value: action.payload.value,
                shopsImg: action.payload.shopsImg,
                titleShops: action.payload.titleShops,
                promoEnd: action.payload.promoEnd,
                promoStart: action.payload.promoStart,
            }]
            return { ...state }
        case BasketActionsTypes.REMOVE_ITEM:
            if (state[action.payload.titleShops].length === 1)
                delete state[action.payload.titleShops]
            else {
                let indexItem = state[action.payload.titleShops].findIndex(v => v.description === action.payload.description)
                state[action.payload.titleShops].splice(indexItem, 1);
            }

            return { ...state }
        default:
            return state;
    }
};
