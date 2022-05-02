import { createContext } from "react";

enum ProductActionsTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
}

interface FetchProductsInfoAction {
  type: ProductActionsTypes.FETCH_PRODUCTS;
  payload: null; // Пока пустой, в дальнейшем возможно появиться нужда в payload'e
}

type ProductAction = FetchProductsInfoAction; // | AnotherProductAction

interface ProductState {
  products: API$ProductInfo[];
}

type IProductContext = [
  state: ProductState,
  dispatch: React.Dispatch<ProductAction>
];

export const initialState: ProductState = { products: [] };

export const ProductContext = createContext<IProductContext>([
  initialState,
  () => {
    console.log("Dispatch не работает");
  },
]);

export const productReducer = (state: ProductState, action: ProductAction) => {
  switch (action.type) {
    case ProductActionsTypes.FETCH_PRODUCTS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
