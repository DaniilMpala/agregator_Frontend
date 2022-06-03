import { post } from "./methods";

export const getFilters = (): Promise<API$FiltersData> => {
  return post("api/product/getOptionsFilter");
};

export const loadItem = (data: API$FilterRequestLoadItem): Promise<API$ReceivedProductsInfoList> => {
  return post("api/product/getAllProduct", data);
};

export const loadChoiceBuyers = (): Promise<API$ListItems[]> => {
  return post("api/product/getChoiceBuyers");
};

export const sendRequestUpdateDemandItem = (data: {_id: string}) => {
  return post("api/product/updateDemandItem", data);
};

export const auth = (data: {login: string, password:string}) => {
  return post("api/lk/auth", data);
};