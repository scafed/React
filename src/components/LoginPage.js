import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.login(username, password)) {
      navigate('/');
    } else {
      setError('Usuario o contraseña inválidos.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card bg-dark text-white p-4">
          <h2>Iniciar Sesión</h2>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Usuario</label>
              <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;