import { useState } from 'react';

const CargarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        // if (nombre === "" || precio === "" || descripcion === "") {
        //     setError('Deberás completar todos los campos');
        //     return;
        // }
        event.preventDefault();
        
        const nuevoProducto = {
            nombre: nombre,
            precio: precio,
            descripcion: descripcion
        };

        fetch('https://66749c0c75872d0e0a970575.mockapi.io/producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        })
        .then(response => {
            if (response.ok) {
                console.log('Producto agregado correctamente');
                setNombre('');
                setPrecio('');
                setDescripcion('');
                setError('');
            } else {
                console.error('Error al agregar el producto');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Cargar Producto</h1>
            <form onSubmit={handleSubmit} className="p-4 bg-white border rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        placeholder="Introduce el nombre del producto"
                        value={nombre} 
                        onChange={(event) => setNombre(event.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="precio" 
                        placeholder="Introduce el precio del producto"
                        value={precio} 
                        onChange={(event) => setPrecio(event.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <textarea 
                        className="form-control" 
                        id="descripcion" 
                        placeholder="Introduce la descripción del producto"
                        rows="4"
                        value={descripcion} 
                        onChange={(event) => setDescripcion(event.target.value)} 
                        required 
                    />
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <button type="submit" className="btn btn-primary w-100 mt-3">Agregar Producto</button>
            </form>
        </div>
    );
};

export default CargarProducto;
