import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'CALCULATE_TOTALS':
      const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      const total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        itemCount,
        total: parseFloat(total.toFixed(2)),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('campusEatsCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      cartData.items.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
        if (item.quantity > 1) {
          dispatch({ 
            type: 'UPDATE_QUANTITY', 
            payload: { id: item._id, quantity: item.quantity } 
          });
        }
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('campusEatsCart', JSON.stringify(state));
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.items]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('campusEatsCart');
  };

  const getItemQuantity = (itemId) => {
    const item = state.items.find(item => item._id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
