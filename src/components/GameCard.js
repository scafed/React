import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CardWrapper = styled.div`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const GameCard = ({ game }) => {
  const { addGameToCart } = useCart();

  return (
    <div className="col">
      <CardWrapper className="card h-100 bg-dark text-white">
        <Link to={`/game/${game.id}`}>
            <img src={game.imagen} className="card-img-top" alt={game.titulo} style={{ height: '300px', objectFit: 'cover' }} />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{game.titulo}</h5>
          <p className="card-text text-muted">{game.plataforma} - {game.genero}</p>
          <h4 className="mt-auto">${game.precio}</h4>
          <button onClick={() => addGameToCart(game)} className="btn btn-primary mt-2">
            <FaCartPlus className="me-2" /> Agregar al Carrito
          </button>
        </div>
      </CardWrapper>
    </div>
  );
};

export default GameCard;