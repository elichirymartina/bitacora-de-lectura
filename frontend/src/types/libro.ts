export interface Autor {
  idAutor?: number;
  nombre: string;
}

export interface Genero {
  idGenero?: number;
  descripcion: string;
}

// Lo que nos devuelve el GET del Backend
export interface Libro {
  idLibro: number;
  titulo: string;
  autor: Autor;
  genero: Genero;
  anioLectura: string; // "YYYY-MM-DD"
  resenia: string;
  citaDestacada: string;
  estrellas: number;
  formato: 'FISICO' | 'DIGITAL';
  personajeFavorito: string;
  finalizado: boolean;
}

// Lo que enviamos en el POST / PUT
export interface LibroFormPayload {
  titulo: string;
  autorNombre: string;
  generoDescripcion: string;
  anioLectura: string; // Le mandaremos "YYYY-01-01"
  resenia: string;
  citaDestacada: string;
  estrellas: number;
  formato: 'FISICO' | 'DIGITAL';
  personajeFavorito: string;
  finalizado: boolean;
}