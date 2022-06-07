import { createContext } from "react";
import { Interface } from "readline";

interface FetchBasket {
    type: BasketActionsTypes;
    payload: ProductsBasket[];
}

type BasketAction = FetchBasket;


export enum BasketActionsTypes {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    LOAD_BASKET = 'LOAD_BASKET',
}


export type BasketState = Record<string, ProductsBasket[]>

type IProductContext = [
    state: BasketState,
    dispatch: React.Dispatch<BasketAction>
];

export const initialState: BasketState = {};

export const BasketContext = createContext<IProductContext>([
    initialState,
    () => {
        console.log("Dispatch не работает");
    },
]);

export const convertBasketInArray = async (state: BasketState) => {
    let tmp: ProductsBasket[] = []
    for (const shopTitle in state) {
        tmp = [...tmp, ...state[shopTitle]]
    }
    return tmp
}
const saveInStorage = async (state: BasketState) => {
    localStorage.stateBasket = JSON.stringify(await convertBasketInArray(state))
}

export const BasketReducer = (state: BasketState, action: BasketAction) => {
    switch (action.type) {
        case BasketActionsTypes.ADD_ITEM:
            console.log("Добавим в корзину")
            for (const Item of action.payload) {
                if (!(Item.titleShops in state)) state[Item.titleShops] = []

                state[Item.titleShops] = [...state[Item.titleShops], {
                    _id: Item._id,
                    img: Item.img,
                    description: Item.description,
                    value: Item.value,
                    shopsImg: Item.shopsImg,
                    titleShops: Item.titleShops,
                    promoEnd: Item.promoEnd,
                    promoStart: Item.promoStart,
                }]
            }

            saveInStorage(state)

            return { ...state }
        case BasketActionsTypes.LOAD_BASKET:
            console.log("LOAD_BASKET в корзину")
            let newState: BasketState = {}
            for (const Item of action.payload) {
                if (!(Item.titleShops in newState)) newState[Item.titleShops] = []

                newState[Item.titleShops] = [...newState[Item.titleShops], {
                    _id: Item._id,
                    img: Item.img,
                    description: Item.description,
                    value: Item.value,
                    shopsImg: Item.shopsImg,
                    titleShops: Item.titleShops,
                    promoEnd: Item.promoEnd,
                    promoStart: Item.promoStart,
                }]
            }

            saveInStorage(newState)

            return { ...newState }
        case BasketActionsTypes.REMOVE_ITEM:
            if (state[action.payload[0].titleShops].length === 1)
                delete state[action.payload[0].titleShops]
            else {
                let indexItem = state[action.payload[0].titleShops].findIndex(v => v.description === action.payload[0].description)
                state[action.payload[0].titleShops].splice(indexItem, 1);
            }

            saveInStorage(state)

            return { ...state }
        default:
            return state;
    }
};
