/* eslint-disable import/no-anonymous-default-export */
import {
  GET_CATEGORIES,
  CREATE_CATEGORIES,
  CREATE_PRODUCTS,
  GET_PRODUCTS,
  REMOVE_PRODUCTS,
  EDIT_PRODUCTS,
} from './type';
export default (state, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case CREATE_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.data,
        count: payload.count,
      };
    case CREATE_PRODUCTS:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case REMOVE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== payload),
      };
    case EDIT_PRODUCTS:
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === payload._id ? payload : p
        ),
      };
    default:
      return state;
  }
};
