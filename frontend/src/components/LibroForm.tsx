import { useEffect, useState, type FormEvent } from 'react';
import { libroService } from '../api/libroService';
import type { Libro, LibroFormPayload } from '../types/libro';
import './LibroForm.css';

interface LibroFormProps {
  tituloModal: string;
  textoBoton: string;
  autoresExistentes: string[];
  generosExistentes: string[];
  libro?: Libro | null;
  onClose: () => void;
}

export const LibroForm = ({
  tituloModal,
  textoBoton,
  autoresExistentes,
  generosExistentes,
  libro,
  onClose,
}: LibroFormProps) => {
  const esEdicion = !!libro;

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anioLectura, setAnioLectura] = useState(new Date().getFullYear().toString());
  const [genero, setGenero] = useState('');
  const [formato, setFormato] = useState<'FISICO' | 'DIGITAL' | ''>('');
  const [personajeFavorito, setPersonajeFavorito] = useState('');
  const [finalizado, setFinalizado] = useState(true);
  const [citaDestacada, setCitaDestacada] = useState('');
  const [resenia, setResenia] = useState('');
  const [estrellas, setEstrellas] = useState<number | null>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  useEffect(() => {
    if (libro) {
      setTitulo(libro.titulo ?? '');
      setAutor(libro.autor?.nombre ?? '');
      setAnioLectura(libro.anioLectura ? libro.anioLectura.substring(0, 4) : new Date().getFullYear().toString());
      setGenero(libro.genero?.descripcion ?? '');
      setFormato(libro.formato ?? '');
      setPersonajeFavorito(libro.personajeFavorito ?? '');
      setFinalizado(libro.finalizado ?? true);
      setCitaDestacada(libro.citaDestacada ?? '');
      setResenia(libro.resenia ?? '');
      setEstrellas(libro.estrellas ?? null);
    } else {
      setTitulo('');
      setAutor('');
      setAnioLectura(new Date().getFullYear().toString());
      setGenero('');
      setFormato('');
      setPersonajeFavorito('');
      setFinalizado(true);
      setCitaDestacada('');
      setResenia('');
      setEstrellas(null);
    }

    setErrorEnvio(null);
  }, [libro]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorEnvio(null);

    if (!titulo.trim()) {
      setErrorEnvio('El título es obligatorio.');
      return;
    }

    if (!formato) {
      setErrorEnvio('El formato es obligatorio.');
      return;
    }

    if (estrellas === null) {
      setErrorEnvio('Tenés que elegir una calificación.');
      return;
    }

    try {
      const payload: LibroFormPayload = {
        titulo: titulo.trim(),
        autorNombre: autor.trim(),
        generoDescripcion: genero.trim(),
        anioLectura: `${anioLectura}-01-01`,
        formato,
        personajeFavorito: personajeFavorito.trim(),
        finalizado,
        citaDestacada: citaDestacada.trim(),
        resenia: resenia.trim(),
        estrellas,
      };

      if (esEdicion && libro) {
        await libroService.modificar(libro.idLibro, payload);
      } else {
        await libroService.crear(payload);
      }

      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      setErrorEnvio('Error al guardar. Revisá la consola y los datos enviados.');
    }
  };

  const handleEliminar = async () => {
    if (!libro) return;

    const confirmar = window.confirm(`¿Eliminar "${libro.titulo}"?`);
    if (!confirmar) return;

    try {
      await libroService.eliminar(libro.idLibro);
      onClose();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setErrorEnvio('Error al eliminar el libro.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{tituloModal}</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            ×
          </button>
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
            <label>Autor/a</label>
            <input
              type="text"
              placeholder="¿Quién lo escribió? (opcional)"
              list="autores-list"
              className="input-literario"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
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
                max={new Date().getFullYear()}
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
              <label>Formato *</label>
              <select
                className="input-literario select-literario"
                value={formato}
                onChange={(e) => setFormato(e.target.value as 'FISICO' | 'DIGITAL' | '')}
                required
              >
                <option value="" disabled>
                  Elegí un formato
                </option>
                <option value="FISICO">Físico</option>
                <option value="DIGITAL">Digital</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tu Calificación *</label>
            <div className="stars-rating-container">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`estrella-voto ${num <= (estrellas ?? 0) ? 'activa' : 'inactiva'}`}
                  onClick={() => setEstrellas(num)}
                  role="button"
                  tabIndex={0}
                >
                  ★
                </span>
              ))}
              <span className="stars-hint">
                {estrellas === null ? '(sin calificar)' : `(${estrellas} de 5 estrellas)`}
              </span>
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
                <span className="label-text">¿Lectura Finalizada?</span>
                <input
                  type="checkbox"
                  checked={finalizado}
                  onChange={(e) => setFinalizado(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
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
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>

            {esEdicion && (
              <button type="button" className="btn-eliminar" onClick={handleEliminar}>
                Eliminar Libro
              </button>
            )}

            <button type="submit" className="btn-guardar">
              {textoBoton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};