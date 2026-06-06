package com.bitacora.libros.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacora.libros.entities.Autor;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Long>{

    Optional<Autor> findByNombre(String nombre);


    List<Autor> findAllByOrderByNombreAsc();
    
}
