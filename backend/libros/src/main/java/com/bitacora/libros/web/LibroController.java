package com.bitacora.libros.web;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitacora.libros.dto.LibroDTO;
import com.bitacora.libros.entities.Libro;
import com.bitacora.libros.service.LibroService;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:5173") // <-- ¡MÁGICO! Clave para que React se conecte sin problemas de CORS
public class LibroController {

    private final LibroService libroService;

    // Inyección por constructor del servicio
    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    // 1. ENDPOINT PARA GUARDAR (POST http://localhost:8080/api/libros)
    @PostMapping
    public ResponseEntity<Libro> crearLibro(@RequestBody LibroDTO libroDTO) {
        Libro nuevoLibro = libroService.guardarLibro(libroDTO);
        return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
    }

    // 2. ENDPOINT PARA LISTAR (GET http://localhost:8080/api/libros)
    @GetMapping
    public ResponseEntity<List<Libro>> listarLibros() {
        List<Libro> libros = libroService.obtenerTodosLosLibros();
        return ResponseEntity.ok(libros);
    }

    // 3. ENDPOINT PARA ELIMINAR (DELETE http://localhost:8080/api/libros/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        libroService.eliminarLibro(id);
        return ResponseEntity.noContent().build();
    }

    // 4. ENDPOINT PARA MODIFICAR (PUT http://localhost:8080/api/libros/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @RequestBody LibroDTO libroDTO) {
    Libro libroActualizado = libroService.actualizarLibro(id, libroDTO);
    return ResponseEntity.ok(libroActualizado);
    }
}
