import {createContext} from "react"

// export const updateAllProducts = () => {

// }
export const initialState = []

export const product = createContext<IProduct>({
    state: [],
    dispatch: () => {console.log("Dispatch не работает")}
})

export const productReducer = (state:Info[], action:IProductReducerAction) => {
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