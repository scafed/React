import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import AdminPage from './components/AdminPage';
import GameDetail from './components/GameDetail';
import ProtectedRoute from './components/ProtectedRoute';

import backgroundImage from './assets/fondo.jpg'; 

function App() {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%'
  };

  return (
    <div style={appStyle}>
      <Header />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;