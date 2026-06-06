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

    // Inyectamos los 3 repositorios mediante el constructor (Práctica recomendada)
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
        
        // 1. LÓGICA "FIND OR CREATE" PARA EL AUTOR (Con placeholder "Anónimo" si viene vacío)
        String nombreAutor = (dto.getAutorNombre() == null || dto.getAutorNombre().trim().isEmpty()) 
                ? "Anónimo o No Identificado" : dto.getAutorNombre().trim();

        Autor autorFinal = autorRepository.findByNombre(nombreAutor)
                .orElseGet(() -> autorRepository.save(new Autor(nombreAutor)));

        // 2. LÓGICA "FIND OR CREATE" PARA EL GÉNERO (Con placeholder "Sin género" si viene vacío)
        String descripcionGenero = (dto.getGeneroDescripcion() == null || dto.getGeneroDescripcion().trim().isEmpty()) 
                ? "Sin género o No Identificado" : dto.getGeneroDescripcion().trim();

        Genero generoFinal = generoRepository.findByDescripcion(descripcionGenero)
                .orElseGet(() -> generoRepository.save(new Genero(descripcionGenero)));

        // 3. PASAR LOS DATOS DEL DTO A NUESTRA ENTIDAD LIBRO
        Libro libro = new Libro();
        libro.setTitulo(dto.getTitulo());
        libro.setAnioLectura(dto.getAnioLectura());
        libro.setResenia(dto.getResenia());
        libro.setCitaDestacada(dto.getCitaDestacada());
        libro.setFormato(dto.getFormato());
        libro.setPersonajeFavorito(dto.getPersonajeFavorito());
        libro.setFinalizado(dto.isFinalizado());
        libro.setEstrellas(dto.getEstrellas());

        // 4. VINCULAR LAS ENTIDADES AUXILIARES YA PROCESADAS
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
    // 1. Buscamos el libro original en la base de datos. Si no existe, lanzamos un error.
    Libro libroExistente = libroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Libro no encontrado con el ID: " + id));

    // 2. Volvemos a aplicar Find or Create para el Autor (por si lo cambió o corrigió un typo)
    String nombreAutor = (dto.getAutorNombre() == null || dto.getAutorNombre().trim().isEmpty()) 
            ? "Anónimo o No Identificado" : dto.getAutorNombre().trim();
    Autor autorFinal = autorRepository.findByNombre(nombreAutor)
            .orElseGet(() -> autorRepository.save(new Autor(nombreAutor)));

    // 3. Volvemos a aplicar Find or Create para el Género
    String descripcionGenero = (dto.getGeneroDescripcion() == null || dto.getGeneroDescripcion().trim().isEmpty()) 
            ? "Sin género o No Identificado" : dto.getGeneroDescripcion().trim();
    Genero generoFinal = generoRepository.findByDescripcion(descripcionGenero)
            .orElseGet(() -> generoRepository.save(new Genero(descripcionGenero)));

    // 4. Pisamos los datos viejos con los nuevos que vienen del DTO
    libroExistente.setTitulo(dto.getTitulo());
    libroExistente.setAnioLectura(dto.getAnioLectura());
    libroExistente.setResenia(dto.getResenia());
    libroExistente.setCitaDestacada(dto.getCitaDestacada());
    libroExistente.setFormato(dto.getFormato());
    libroExistente.setPersonajeFavorito(dto.getPersonajeFavorito());
    libroExistente.setFinalizado(dto.isFinalizado());
    libroExistente.setEstrellas(dto.getEstrellas());

    // 5. Le asignamos los nuevos objetos de autor y género ya procesados
    libroExistente.setAutor(autorFinal);
    libroExistente.setGenero(generoFinal);

    // 6. Guardamos los cambios (como el objeto ya tiene ID, Hibernate hace un UPDATE en vez de un INSERT)
    return libroRepository.save(libroExistente);
}

    @Override
    public void eliminarLibro(Long id) {
        libroRepository.deleteById(id);
    }
}
