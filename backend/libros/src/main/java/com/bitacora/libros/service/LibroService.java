package com.bitacora.libros.service;

import java.util.List;

import com.bitacora.libros.dto.LibroDTO;
import com.bitacora.libros.entities.Libro;

public interface LibroService {

    Libro guardarLibro(LibroDTO libroDTO);
    
    List<Libro> obtenerTodosLosLibros();

    Libro actualizarLibro(Long id, LibroDTO libroDTO);
    
    void eliminarLibro(Long id);
}
