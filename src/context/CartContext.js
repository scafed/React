import { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GAME':
      const existingGame = state.find(game => game.id === action.payload.id);
      if (existingGame) {
        // CAMBIO: .title -> .titulo
        toast.info(`${action.payload.titulo} ya está en el carrito.`);
        return state;
      }
      // CAMBIO: .title -> .titulo
      toast.success(`${action.payload.titulo} agregado al carrito!`);
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_GAME':
      toast.error(`Juego eliminado del carrito.`);
      return state.filter(game => game.id !== action.payload);
    case 'CLEAR_CART':
      toast.warn('El carrito se ha vaciado.');
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addGameToCart = (game) => dispatch({ type: 'ADD_GAME', payload: game });
  const removeGameFromCart = (id) => dispatch({ type: 'REMOVE_GAME', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = { cart, addGameToCart, removeGameFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};