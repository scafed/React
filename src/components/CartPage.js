import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeGameFromCart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, game) => total + Number(game.precio), 0);

  if (cart.length === 0) {
    return <h2 className="text-center text-white">Tu carrito está vacío.</h2>;
  }

  return (
    <div className="card bg-dark text-white p-4">
      <h2>Carrito de Compras</h2>
      {cart.map(game => (
        <div key={game.id} className="d-flex justify-content-between align-items-center my-2 border-bottom pb-2">
          <div>
            <h5>{game.titulo}</h5>
            <p>${game.precio}</p>
          </div>
          <button onClick={() => removeGameFromCart(game.id)} className="btn btn-danger btn-sm"><FaTrash /></button>
        </div>
      ))}
      <div className="mt-4">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={clearCart} className="btn btn-warning me-2">Vaciar Carrito</button>
        <button className="btn btn-success">Proceder al Pago</button>
      </div>
    </div>
  );
};

export default CartPage;