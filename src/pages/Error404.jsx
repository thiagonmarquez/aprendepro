import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
      <img src="https://via.placeholder.com/300?text=404+Error" alt="404 Error" className="mb-4 img-fluid" />
      <h1 className="display-4 mb-3 text-primary">Página no encontrada</h1>
      <p className="lead mb-4 text-muted">Lo sentimos, pero la página que estás buscando no existe.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Ir a Home
      </Link>
    </div>
  );
};

export default Error404
