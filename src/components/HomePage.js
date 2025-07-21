import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import * as api from '../api';
import GameCard from './GameCard';

const SearchInput = styled.input`
  &::placeholder {
    color: #6c757d;
    opacity: 1;
  }
`;

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.getGames()
      .then(response => setGames(response.data))
      .catch(() => setError('No se pudieron cargar los juegos.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredGames = games.filter(game =>
    game.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.plataforma.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-light" /></div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div>
      <div className="p-4 mb-4 bg-secondary text-white rounded-3">
        <h1>Bienvenido a la mejor Tienda de Videojuegos!</h1>
        <p className="lead">Tienda dedicada a la venta de videojuegos</p>
        <hr />
        <div className="row mt-4 justify-content-center text-center text-md-start">
          <div className="col-md-7 mb-3 mb-md-0">
            <h5>Contacto</h5>
            <p><FaMapMarkerAlt className="me-3" /> Calle Falsa 123, Springfield</p>
            <p><FaPhone className="me-3" /> +54 9 11 1234-5678</p>
          </div>
          <div className="col-md-2">
            <h5>Seguínos</h5>
            <a href="#" className="text-white me-3 fs-4"><FaFacebook /></a>
            <a href="#" className="text-white me-3 fs-4"><FaInstagram /></a>
            <a href="#" className="text-white fs-4"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
      <SearchInput
        type="text"
        className="form-control mb-4 bg-dark text-white"
        placeholder="Buscar por título o plataforma"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default HomePage;