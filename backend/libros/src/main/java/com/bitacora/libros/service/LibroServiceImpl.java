package com.bitacora.libros.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bitacora.libros.dto.LibroDTO;
import com.bitacora.libros.entities.Autor;
import com.bitacora.libros.entities.Genero;
import com.bitacora.libros.entities.Libro;
import com.bitacora.libros.repository.AutorRepository;
import com.bitacora.libros.repository.GeneroRepository;
import com.bitacora.libros.repository.LibroRepository;

@Service
public class LibroServiceImpl implements LibroService {


    private final LibroRepository libroRepository;
    private final AutorRepository autorRepository;
    private final GeneroRepository generoRepository;

    public LibroServiceImpl(LibroRepository libroRepository, 
                            AutorRepository autorRepository, 
                            GeneroRepository generoRepository) {
        this.libroRepository = libroRepository;
        this.autorRepository = autorRepository;
        this.generoRepository = generoRepository;
    }

    @Override
    public Libro guardarLibro(LibroDTO dto) {

        System.out.println("Autor recibido: " + dto.getAutorNombre());
        System.out.println("Genero recibido: " + dto.getGeneroDescripcion());
        
        
        String nombreAutor = (dto.getAutorNombre() == null || dto.getAutorNombre().trim().isEmpty()) 
                ? "Anónimo o No Identificado" : dto.getAutorNombre().trim();

        Autor autorFinal = autorRepository.findByNombre(nombreAutor)
                .orElseGet(() -> autorRepository.save(new Autor(nombreAutor)));

        
        String descripcionGenero = (dto.getGeneroDescripcion() == null || dto.getGeneroDescripcion().trim().isEmpty()) 
                ? "Sin género o No Identificado" : dto.getGeneroDescripcion().trim();

        Genero generoFinal = generoRepository.findByDescripcion(descripcionGenero)
                .orElseGet(() -> generoRepository.save(new Genero(descripcionGenero)));

        Libro libro = new Libro();
        libro.setTitulo(dto.getTitulo());
        libro.setAnioLectura(dto.getAnioLectura());
        libro.setResenia(dto.getResenia());
        libro.setCitaDestacada(dto.getCitaDestacada());
        libro.setFormato(dto.getFormato());
        libro.setPersonajeFavorito(dto.getPersonajeFavorito());
        libro.setFinalizado(dto.isFinalizado());
        libro.setEstrellas(dto.getEstrellas());

        libro.setAutor(autorFinal);
        libro.setGenero(generoFinal);


        return libroRepository.save(libro);
    }

    @Override
    public List<Libro> obtenerTodosLosLibros() {
        return libroRepository.findAllByOrderByTituloAsc();
    }

    @Override
    public Libro actualizarLibro(Long id, LibroDTO dto) {
    Libro libroExistente = libroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Libro no encontrado con el ID: " + id));

    String nombreAutor = (dto.getAutorNombre() == null || dto.getAutorNombre().trim().isEmpty()) 
            ? "Anónimo o No Identificado" : dto.getAutorNombre().trim();

    Autor autorFinal = autorRepository.findByNombre(nombreAutor)
            .orElseGet(() -> autorRepository.save(new Autor(nombreAutor)));

    String descripcionGenero = (dto.getGeneroDescripcion() == null || dto.getGeneroDescripcion().trim().isEmpty()) 
            ? "Sin género o No Identificado" : dto.getGeneroDescripcion().trim();

    Genero generoFinal = generoRepository.findByDescripcion(descripcionGenero)
            .orElseGet(() -> generoRepository.save(new Genero(descripcionGenero)));


    libroExistente.setTitulo(dto.getTitulo());
    libroExistente.setAnioLectura(dto.getAnioLectura());
    libroExistente.setResenia(dto.getResenia());
    libroExistente.setCitaDestacada(dto.getCitaDestacada());
    libroExistente.setFormato(dto.getFormato());
    libroExistente.setPersonajeFavorito(dto.getPersonajeFavorito());
    libroExistente.setFinalizado(dto.isFinalizado());
    libroExistente.setEstrellas(dto.getEstrellas());

    libroExistente.setAutor(autorFinal);
    libroExistente.setGenero(generoFinal);

    return libroRepository.save(libroExistente);
}
    @Override
    public void eliminarLibro(Long id) {
        libroRepository.deleteById(id);
    }
}
