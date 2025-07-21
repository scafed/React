import { useState, useEffect } from 'react';
import * as api from '../api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminPage = () => {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({ titulo: '', precio: '', descripcion: '', plataforma: '', genero: '', imagen: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  const fetchGames = () => {
    api.getGames().then(res => setGames(res.data)).catch(() => toast.error("Error al cargar juegos"));
  }

  useEffect(fetchGames, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.titulo || formData.precio <= 0){
        toast.error("Título y precio (mayor a 0) son obligatorios.");
        return;
    }

    const apiCall = isEditing ? api.updateGame(formData.id, formData) : api.createGame(formData);
    
    apiCall.then(() => {
      toast.success(`Juego ${isEditing ? 'actualizado' : 'creado'} con éxito!`);
      setIsEditing(false);
      setFormData({ titulo: '', precio: '', descripcion: '', plataforma: '', genero: '', imagen: '' });
      fetchGames();
    }).catch(() => toast.error("Ocurrió un error."));
  }
  
  const handleEdit = (game) => {
    setIsEditing(true);
    setFormData(game);
  }

  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro de que quieres eliminar este juego?")){
      api.deleteGame(id).then(() => {
        toast.success("Juego eliminado.");
        fetchGames();
      }).catch(() => toast.error("Error al eliminar el juego."));
    }
  }
  
  return (
    <div className="row text-white">
      <div className="col-md-4">
        <div className="card bg-dark p-4">
          <h3>{isEditing ? 'Editar' : 'Agregar'} Juego</h3>
          <form onSubmit={handleSubmit}>
            <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" className="form-control mb-2 bg-secondary text-white" />
            <input name="precio" type="number" value={formData.precio} onChange={handleChange} placeholder="Precio" className="form-control mb-2 bg-secondary text-white" />
            <input name="plataforma" value={formData.plataforma} onChange={handleChange} placeholder="Plataforma" className="form-control mb-2 bg-secondary text-white" />
            <input name="genero" value={formData.genero} onChange={handleChange} placeholder="Género" className="form-control mb-2 bg-secondary text-white" />
            <input name="imagen" value={formData.imagen} onChange={handleChange} placeholder="URL de la Imagen" className="form-control mb-2 bg-secondary text-white" />
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="form-control mb-2 bg-secondary text-white"></textarea>
            <button type="submit" className="btn btn-success">{isEditing ? 'Actualizar' : 'Crear'}</button>
            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ titulo: '', precio: '', descripcion: '', plataforma: '', genero: '', imagen: '' }); }} className="btn btn-secondary ms-2">Cancelar</button>}
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <h2>Lista de Juegos</h2>
        <ul className="list-group">
          {games.map(game => (
            <li key={game.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
              {game.titulo}
              <div>
                <button onClick={() => handleEdit(game)} className="btn btn-warning btn-sm me-2"><FaEdit /></button>
                <button onClick={() => handleDelete(game.id)} className="btn btn-danger btn-sm"><FaTrash /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;