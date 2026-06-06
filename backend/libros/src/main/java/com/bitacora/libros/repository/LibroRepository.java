package com.bitacora.libros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacora.libros.entities.Libro;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {
    
    List<Libro> findAllByOrderByTituloAsc();

    List<Libro> findByFinalizado(boolean finalizado);


}
