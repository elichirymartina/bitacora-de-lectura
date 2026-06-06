package com.bitacora.libros.entities;

import java.time.LocalDate;

import jakarta.persistence.*;


@Entity
@Table(name = "libros")
public class Libro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_libro")
    private Long idLibro;

    @Column(name = "titulo", length = 256, nullable = false)
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "id_autor", nullable = false)
    private Autor autor;

    @ManyToOne
    @JoinColumn(name = "id_genero", nullable = false)
    private Genero genero;

    @Column(name = "anio_de_lectura")
    private LocalDate anioLectura;

    @Column(name = "resenia", length = 512)
    private String resenia;

    @Column(name = "cita_destacada", length = 512)
    private String citaDestacada;

    @Enumerated(EnumType.STRING)
    @Column(name = "formato", nullable = false)
    private Formato formato;

    @Column(name = "personaje_favorito", length = 256)
    private String personajeFavorito;

    @Column(name = "finalizado", nullable = false)
    private boolean finalizado;

    @Column(name = "estrellas")
    private Integer estrellas;

    public Libro() {
    }

    // Getters y Setters
    public Long getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(Long idLibro) {
        this.idLibro = idLibro;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
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

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
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

    public LocalDate getAnioLectura() {
        return anioLectura;
    }

    public void setAnioLectura(LocalDate anioLectura) {
        this.anioLectura = anioLectura;
    }


    public Integer getEstrellas() {
        return estrellas;
    }

    public void setEstrellas(Integer estrellas) {
        this.estrellas = estrellas;
    }

}
