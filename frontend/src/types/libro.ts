export interface Autor {
  idAutor?: number;
  nombre: string;
}

export interface Genero {
  idGenero?: number;
  descripcion: string;
}

export interface Libro {
  idLibro: number;
  titulo: string;
  autor: Autor;
  genero: Genero;
  anioLectura: string;
  resenia: string;
  citaDestacada: string;
  estrellas: number;
  formato: 'FISICO' | 'DIGITAL' | 'AUDIOLIBRO';
  personajeFavorito: string;
  finalizado: boolean;
}


export interface LibroFormPayload {
  titulo: string;
  autorNombre: string;
  generoDescripcion: string;
  anioLectura: string;
  resenia: string;
  citaDestacada: string;
  estrellas: number;
  formato: 'FISICO' | 'DIGITAL' | 'AUDIOLIBRO';
  personajeFavorito: string;
  finalizado: boolean;
}