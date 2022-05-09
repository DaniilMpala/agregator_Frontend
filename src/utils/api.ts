import { post } from "./methods";

export const getFilters = (): Promise<API$FiltersData> => {
  return post("api/product/getOptionsFilter");
};

export const loadItem = (data: API$FilterRequestLoadItem): Promise<API$ReceivedProductsInfoList> => {
  return post("api/product/getAllProduct", data);
};
