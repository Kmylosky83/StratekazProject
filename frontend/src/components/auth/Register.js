import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    user_type: 'professional'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
      if (response.id) {
        navigate('/login', { state: { success: 'Registro exitoso. Por favor inicia sesión.' } });
      } else {
        setError('Error en el registro. Por favor intenta nuevamente.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta más tarde.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Registro</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tipo de Usuario</label>
                  <select 
                    className="form-select" 
                    name="user_type" 
                    value={formData.user_type} 
                    onChange={handleChange}
                  >
                    <option value="professional">Profesional Independiente</option>
                    <option value="consultant_company">Empresa Consultora</option>
                    <option value="direct_company">Empresa Directa</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre de Usuario</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;