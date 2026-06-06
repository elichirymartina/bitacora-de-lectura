import { useState, useEffect } from 'react';
import { libroService } from './api/libroService';
import type { Libro } from './types/libro';
import { LibroForm } from './components/LibroForm';
import './App.css';

function App() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null);

  const cargarLibros = async () => {
    try {
      setCargando(true);
      const data = await libroService.obtenerTodos();
      setLibros(data);
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const autoresExistentes = Array.from(
    new Set(
      libros
        .map((l) => l.autor?.nombre)
        .filter((nombre): nombre is string => Boolean(nombre))
    )
  );

  const generosExistentes = Array.from(
    new Set(
      libros
        .map((l) => l.genero?.descripcion)
        .filter((descripcion): descripcion is string => Boolean(descripcion))
    )
  );

  const renderizarEstrellas = (cantidad: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`estrella-lista ${index < cantidad ? 'activa' : 'inactiva'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="bitacora-container">
      <header className="bitacora-header">
        <div className="header-box">
          <span className="header-icon">📖</span>
          <h1>Mi Bitácora de Lectura</h1>
          <p className="subtitle">Seguimiento y análisis de libros</p>
        </div>
      </header>

      <main className="bitacora-main">
        <div className="action-area">
          <button
            type="button"
            className="btn-registrar"
            onClick={() => {
              setLibroSeleccionado(null);
              setMostrarModal(true);
            }}
          >
            <span className="plus-icon">+</span> Registrar libro
          </button>
        </div>

        {!cargando && libros.length > 0 && (
          <p className="contador-libros">
            {libros.length} {libros.length === 1 ? 'libro registrado' : 'libros registrados'} ✨
          </p>
        )}

        {cargando ? (
          <div className="loading-state">Cargando tu bitácora...</div>
        ) : libros.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron libros en la bitácora.</p>
            <p className="empty-call">¿Qué te parece registrar tu primer libro?</p>
          </div>
        ) : (
          <div className="libros-list">
            {libros.map((libro) => (
              <div key={libro.idLibro} className="libro-card">
                <div className="card-info">
                  <h3 className="libro-titulo">{libro.titulo}</h3>
                  <p className="libro-meta">
                    {libro.autor?.nombre} •{' '}
                    <span className="libro-anio">{libro.anioLectura?.split('-')[0]}</span>
                  </p>
                </div>

                <div className="card-actions">
                  <div className="stars-display">{renderizarEstrellas(libro.estrellas)}</div>
                  <button
                    type="button"
                    className="btn-ver-mas"
                    onClick={() => {
                      setLibroSeleccionado(libro);
                      setMostrarModal(true);
                    }}
                  >
                    📖 Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {mostrarModal && (
        <LibroForm
          tituloModal={libroSeleccionado ? '📚 Detalle del libro' : '📖 Registrar libro'}
          textoBoton={libroSeleccionado ? 'Modificar' : 'Registrar libro'}
          libro={libroSeleccionado}
          autoresExistentes={autoresExistentes}
          generosExistentes={generosExistentes}
          onClose={() => {
            setMostrarModal(false);
            setLibroSeleccionado(null);
            cargarLibros();
          }}
        />
      )}
    </div>
  );
}

export default App;