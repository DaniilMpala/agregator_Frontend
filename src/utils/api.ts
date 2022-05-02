import { post } from "./methods";

export const getFilters = (): Promise<API$FiltersData> => {
  // (?) Вопрос почему при получении фильтров юзается POST, а не GET
  // (-) Я бы поменял 'api/product/getOptionsFilter' -> 'api/product/filters' + post -> get
  return post("api/product/getOptionsFilter");
};
