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
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getCategories = async (payload) => {
    try {
      dispatch({
        type: GET_CATEGORIES,
        payload,
      });
    } catch (err) {}
  };

  const createCategories = async (payload) => {
    dispatch({
      type: CREATE_CATEGORIES,
      payload,
    });
  };

  const getProducts = async (payload) => {
    try {
      dispatch({
        type: GET_PRODUCTS,
        payload,
      });
    } catch (err) {}
  };

  const createProducts = async (payload) => {
    dispatch({
      type: CREATE_PRODUCTS,
      payload,
    });
  };
  const removeProducts = async (payload) => {
    dispatch({
      type: REMOVE_PRODUCTS,
      payload,
    });
  };
  const editProducts = async (payload) => {
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
