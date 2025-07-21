import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        api.getGameById(id).then(res => setGame(res.data));
    }, [id]);

    if (!game) return <div className="text-center mt-5"><div className="spinner-border text-light" /></div>;

    return (
        <div className="row text-white">
            <div className="col-md-6">
                <img src={game.imagen} alt={game.titulo} className="img-fluid rounded" />
            </div>
            <div className="col-md-6">
                <h1>{game.titulo}</h1>
                <h3 className="text-muted">{game.plataforma} - {game.genero}</h3>
                <h2>${game.precio}</h2>
                <p className="mt-4">{game.descripcion}</p>
            </div>
        </div>
    );
};

export default GameDetail;