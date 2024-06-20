import { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';


const EditarProducto = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    
    
    useEffect(() => {
        fetch(`https://66749c0c75872d0e0a970575.mockapi.io/producto/${id}`)
        .then(res => res.json())
        .then(res => {
            setData(res);
            setNombre(res.name || '');
            setPrecio(res.precio || '');
            setDescripcion(res.descripcion || '');
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // if (!nombre || !precio || !descripcion) {
        //     setError('Debes completar todos los campos');
        //     return;
        // }

        const nuevoProducto = {
            name: nombre,
            precio: precio,
            descripcion: descripcion
        };

        fetch(`https://66749c0c75872d0e0a970575.mockapi.io/producto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        })
        .then(response => {
            if (response.ok) {
                console.log('Producto actualizado correctamente');
                setNombre('');
                setPrecio('');
                setDescripcion('');
                setError('');
            } else {
                console.error('Error al actualizar el producto');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    };

    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <h1>Cargando...</h1>
                </div>
            ) : (
                <div className="container mt-5">
                    <h1 className="text-center mb-4">Editar Producto</h1>
                    <form onSubmit={handleSubmit} className="p-4 bg-light border rounded shadow">
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
                        <button type="submit" className="btn btn-primary w-100 mt-3">Guardar Cambios</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditarProducto;
