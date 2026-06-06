package com.bitacora.libros.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "generos")
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_genero")
    private Long idGenero;

    @Column(name = "descripcion", length = 256, nullable = false, unique = true)
    private String descripcion;

    
    public Genero() {
    }   

    public Genero(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdGenero() {
        return idGenero;
    }

    public void setIdGenero(Long idGenero) {
        this.idGenero = idGenero;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
}
