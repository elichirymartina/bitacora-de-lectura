import type { Libro, LibroFormPayload } from "../types/libro";

const API_URL = 'http://localhost:8080/api/libros';

export const libroService = {
  async obtenerTodos(): Promise<Libro[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener los libros');
    return res.json();
  },

  async crear(libro: LibroFormPayload): Promise<Libro> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libro),
    });
    if (!res.ok) throw new Error('Error al crear el libro');
    return res.json();
  },

  async modificar(id: number, libro: LibroFormPayload): Promise<Libro> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libro),
    });
    if (!res.ok) throw new Error('Error al modificar el libro');
    return res.json();
  },

  async eliminar(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar el libro');
  }
};
