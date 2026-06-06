package com.bitacora.libros.entities;

import jakarta.persistence.*;


@Entity
@Table(name = "autores")
public class Autor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_autor")
    private Long idAutor;

    @Column(name = "nombre", length = 256, nullable = false, unique = true)
    private String nombre;

    
    public Autor() {
    }   

    public Autor(String nombre) {
        this.nombre = nombre;
    }

    public Long getIdAutor() {
        return idAutor;
    }

    public void setIdAutor(Long idAutor) {
        this.idAutor = idAutor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}

