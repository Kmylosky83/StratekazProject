import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    
    // Inicializar formData según el tipo de usuario
    if (userData.user_type === 'professional') {
      setFormData({
        first_name: '',
        last_name: '',
        profession: '',
        phone: '',
        city: '',
        department: ''
      });
    } else {
      setFormData({
        company_name: '',
        nit: '',
        industry: '',
        contact_position: '',
        phone: '',
        city: '',
        department: ''
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.completeProfile(formData);
      if (response.profile_completed) {
        navigate('/dashboard');
      } else {
        setError('Error al completar el perfil. Por favor intenta nuevamente.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta más tarde.');
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Completar Perfil</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                {user.user_type === 'professional' ? (
                  // Formulario para profesional independiente
                  <>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Nombre</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="first_name" 
                          value={formData.first_name} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Apellido</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="last_name" 
                          value={formData.last_name} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Profesión</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="profession" 
                        value={formData.profession} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </>
                ) : (
                  // Formulario para empresas
                  <>
                    <div className="mb-3">
                      <label className="form-label">Nombre de la Empresa</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="company_name" 
                        value={formData.company_name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">NIT</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="nit" 
                        value={formData.nit} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Industria</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="industry" 
                        value={formData.industry} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cargo del Contacto</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="contact_position" 
                        value={formData.contact_position} 
                        onChange={handleChange} 
                      />
                    </div>
                  </>
                )}
                
                {/* Campos comunes para todos los tipos de usuario */}
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Ciudad</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Departamento</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="department" 
                      value={formData.department} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Perfil</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;