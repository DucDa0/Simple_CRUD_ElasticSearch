import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import {
  GET_CATEGORIES,
  CREATE_CATEGORIES,
  GET_PRODUCTS,
  CREATE_PRODUCTS,
  REMOVE_PRODUCTS,
  EDIT_PRODUCTS,
} from '../context/type';

const initialState = {
  categories: [],
  products: [],
  count: 0,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getCategories = (payload) => {
    dispatch({
      type: GET_CATEGORIES,
      payload,
    });
  };

  const createCategories = (payload) => {
    dispatch({
      type: CREATE_CATEGORIES,
      payload,
    });
  };

  const getProducts = (payload) => {
    dispatch({
      type: GET_PRODUCTS,
      payload,
    });
  };

  const createProducts = (payload) => {
    dispatch({
      type: CREATE_PRODUCTS,
      payload,
    });
  };
  const removeProducts = (payload) => {
    dispatch({
      type: REMOVE_PRODUCTS,
      payload,
    });
  };
  const editProducts = (payload) => {
    dispatch({
      type: EDIT_PRODUCTS,
      payload,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        categories: state.categories,
        products: state.products,
        count: state.count,
        getCategories,
        createCategories,
        getProducts,
        createProducts,
        removeProducts,
        editProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
