package com.bitacora.libros.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacora.libros.entities.Genero;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {

    Optional<Genero> findByDescripcion(String descripcion);

    List<Genero> findAllByOrderByDescripcionAsc();
    
}
