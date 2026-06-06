import { useState } from 'react';
import { libroService } from '../api/libroService';
import './LibroForm.css';
import type { Libro } from '../types/libro';

interface LibroFormProps {
  tituloModal: string;
  textoBoton: string;
  autoresExistentes: string[];
  generosExistentes: string[];
  onClose: () => void;

   libro?: Libro; 
}


export const LibroForm = ({ tituloModal, textoBoton, autoresExistentes, generosExistentes, onClose }: LibroFormProps) => {
  // 1. Creamos un estado por cada campo del formulario
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anioLectura, setAnioLectura] = useState('2026');
  const [genero, setGenero] = useState('');
  const [formato, setFormato] = useState('FISICO');
  const [personajeFavorito, setPersonajeFavorito] = useState('');
  const [finalizado, setFinalizado] = useState(true);
  const [citaDestacada, setCitaDestacada] = useState('');
  const [resenia, setResenia] = useState('');
  
  // Estado para las estrellas interactivas (empieza en 5 por defecto)
  const [estrellas, setEstrellas] = useState(5);
  
  // Estado opcional para manejar un mensaje si algo falla
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorEnvio(null);

  try {
    // Armamos el payload con los nombres exactos de tu modelo Java
    const payload = {
    titulo,
    autorNombre: autor,
    generoDescripcion: genero,
    anioLectura: `${anioLectura}-01-01`,
    formato,
    personajeFavorito,
    finalizado,
    citaDestacada,
    resenia,
    estrellas
    };

    console.log("Esto es lo que viaja al backend:", payload); // Monitorealo en la consola del navegador

    await libroService.crear(payload as any);
    onClose(); // Cierra y recarga
  } catch (error) {
    console.error('Error al guardar:', error);
    setErrorEnvio('Error al guardar. Revisá los nombres de los campos en tu consola de Java.');
  }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{tituloModal}</h2>
          <button type="button" className="close-btn" onClick={onClose}>×</button>
        </div>

        {errorEnvio && <div className="error-alert">{errorEnvio}</div>}

        <form className="bitacora-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título *</label>
            <input 
              type="text" 
              placeholder="¿Cómo se llama el libro?" 
              className="input-literario" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Autor/a *</label>
            <input 
              type="text" 
              placeholder="¿Quién lo escribió?" 
              list="autores-list" 
              className="input-literario"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required 
            />
            <datalist id="autores-list">
              {autoresExistentes.map((auth, idx) => (
                <option key={idx} value={auth} />
              ))}
            </datalist>
          </div>

          <div className="form-row-three">
            <div className="form-group">
              <label>Año leído *</label>
              <input 
                type="number" 
                min="1000" 
                max="2026" 
                className="input-literario" 
                value={anioLectura}
                onChange={(e) => setAnioLectura(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Género</label>
              <input 
                type="text" 
                placeholder="Ej: Fantasía, Ficción" 
                list="generos-list" 
                className="input-literario"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
              <datalist id="generos-list">
                {generosExistentes.map((gen, idx) => (
                  <option key={idx} value={gen} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label>Formato</label>
              <select 
                className="input-literario select-literario"
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
              >
                <option value="FISICO">📖 Físico</option>
                <option value="DIGITAL">📱 Digital</option>
              </select>
            </div>
          </div>

          {/* NUEVA FILA: Selector interactivo de Estrellas */}
          <div className="form-group">
            <label>Tu Calificación *</label>
            <div className="stars-rating-container">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`estrella-voto ${num <= estrellas ? 'activa' : 'inactiva'}`}
                  onClick={() => setEstrellas(num)}
                >
                  ★
                </span>
              ))}
              <span className="stars-hint">({estrellas} de 5 estrellas)</span>
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label>Personaje Favorito</label>
              <input 
                type="text" 
                placeholder="¿Quién te marcó más?" 
                className="input-literario" 
                value={personajeFavorito}
                onChange={(e) => setPersonajeFavorito(e.target.value)}
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={finalizado} 
                  onChange={(e) => setFinalizado(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                <span className="label-text">¿Lectura Finalizada?</span>
              </label>
            </div>
          </div>

          <div className="form-group quote-group">
            <label>Cita Destacada</label>
            <div className="quote-outer-container">
              <span className="quote-mark open">“</span>
              <textarea 
                placeholder="Vi el populoso mar, vi el alba y la tarde..." 
                className="input-literario textarea-quote" 
                value={citaDestacada}
                onChange={(e) => setCitaDestacada(e.target.value)}
              />
              <span className="quote-mark close">”</span>
            </div>
          </div>

          <div className="form-group">
            <label>Reseña (Notas personales)</label>
            <textarea 
              placeholder="¿Qué te pareció? ¿Qué te llevás de esta lectura?" 
              className="input-literario lines-textarea" 
              value={resenia}
              onChange={(e) => setResenia(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-guardar">{textoBoton}</button>
          </div>
        </form>
      </div>
    </div>
  );
};