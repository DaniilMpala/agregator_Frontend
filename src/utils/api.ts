import { post } from "./methods";

export const getFilters = (): Promise<API$FiltersData> => {
  return post("api/product/getOptionsFilter");
};

export const loadItem = (data: API$FilterRequestLoadItem): Promise<API$ReceivedProductsInfoList> => {
  return post("api/product/getAllProduct", data);
};
export const makeFavoriteApi = (data: {_id: string, now:boolean}): Promise<{result: boolean}> => {
  return post("api/product/makeFavorite", data);
};

export const loadChoiceBuyers = (): Promise<API$ListItems[]> => {
  return post("api/product/getChoiceBuyers");
};

export const sendRequestUpdateDemandItem = (data: {_id: string}) => {
  post("api/product/updateDemandItem", data);
};

export const auth = (data: {login: string, password:string}): Promise<API$Authorization> => {
  return post("api/lk/auth", data);
};

export const getDataUserSetting = (): Promise<API$GetUserSetting> => {
  return post("api/lk/getDataUserSetting");
};

export const getDataUserFavoriteProducts = (data: {skip: number}): Promise<API$GetUserFavoriteProducts> => {
  return post("api/lk/getDataUserFavoriteProducts", data);
};

export const changeNotifyUser = (data: {type: string, value:any}) => {
  return post("api/lk/changeNotifyUser", data);
};

export const saveBasketInProfile = (data: API$ISaveBasketInProfile) => {
  return post("api/lk/saveBasket", data);
};

export const getDataSaveBasket = (data: {skip: number}): Promise<API$GetUserSaveBasket> => {
  return post("api/lk/getDataSaveBasket", data);
};

export const updateDataSaveBasket = (data: {index: number}): Promise<{auth: boolean, result: boolean}> => {
  return post("api/lk/deleteSaveBasket", data);
};

export const updatePasswordUser = (data: {newPassword: string | null}): Promise<{auth: boolean, result: boolean}> => {
  return post("api/lk/changePasswordUser", data);
};