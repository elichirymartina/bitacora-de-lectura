package com.bitacora.libros.dto;

import java.time.LocalDate;

import com.bitacora.libros.entities.Formato;

public class LibroDTO {
    private String titulo;
    private String autorNombre;       
    private String generoDescripcion; 
    private LocalDate anioLectura;
    private String resenia;
    private String citaDestacada;
    private Formato formato;
    private String personajeFavorito;
    private boolean finalizado;
    private Integer estrellas;       

  
    public LibroDTO() {
    }

    // Getters y Setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutorNombre() {
        return autorNombre;
    }

    public void setAutorNombre(String autorNombre) {
        this.autorNombre = autorNombre;
    }

    public String getGeneroDescripcion() {
        return generoDescripcion;
    }

    public void setGeneroDescripcion(String generoDescripcion) {
        this.generoDescripcion = generoDescripcion;
    }

    public LocalDate getAnioLectura() {
        return anioLectura;
    }

    public void setAnioLectura(LocalDate anioLectura) {
        this.anioLectura = anioLectura;
    }

    public String getResenia() {
        return resenia;
    }

    public void setResenia(String resenia) {
        this.resenia = resenia;
    }

    public String getCitaDestacada() {
        return citaDestacada;
    }

    public void setCitaDestacada(String citaDestacada) {
        this.citaDestacada = citaDestacada;
    }

    public Formato getFormato() {
        return formato;
    }

    public void setFormato(Formato formato) {
        this.formato = formato;
    }

    public String getPersonajeFavorito() {
        return personajeFavorito;
    }

    public void setPersonajeFavorito(String personajeFavorito) {
        this.personajeFavorito = personajeFavorito;
    }

    public boolean isFinalizado() {
        return finalizado;
    }

    public void setFinalizado(boolean finalizado) {
        this.finalizado = finalizado;
    }

    public Integer getEstrellas() {
        return estrellas;
    }

    public void setEstrellas(Integer estrellas) {
        this.estrellas = estrellas;
    }
}
